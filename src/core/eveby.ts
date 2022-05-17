import { config } from 'dotenv';
import { Client, ClientOptions, Collection } from 'discord.js';
import { ConfigManager } from './config-manager';
import { BootManager } from './boot/boot-manager';
import { PluginManager } from './plugin/plugin-manager';

export class Eveby {
  /**
   * Dados
   */
  storage: Collection<string, any>;

  /**
   * Configurações
   */
  config: ConfigManager;

  /**
   * Eventos.
   */
  boot: BootManager;

  /**
   * Extensões.
   */
  plugins: PluginManager;

  constructor(options: ClientOptions) {
    this.storage = new Collection();
    this.storage.set('client', new Client(options));

    /**
     * Configurações do projeto.
     */
    this.config = new ConfigManager();

    /**
     * Eventos
     */
    this.boot = new BootManager();
    
    /**
     * Extensões
     */
    this.plugins = new PluginManager();
  }

  /**
   * A função "getPath" é responsável por retornar o caminho absoluto do projeto.
   * @returns string
   */
  getPath(): string {
    return process.cwd();
  }

  async login(): Promise<boolean> {
    config({
      path: `./environments/.env.${this.config.get('mode')}`,
    });

    if (!(await this.storage.get('client').login(process.env.EVEBY_TOKEN)))
      return false;

    return true;
  }

  /**
   * A função "load" é responsável pelo carregamento dos componentes.
   * @returns boolean
   */
  async load(): Promise<boolean> {
    this.storage.set(
      'boot',
      this.boot.load().then((fnc: CallableFunction) => {
        return this.boot.run(`${this.getPath()}/dist/spices/boot/`, fnc);
      }),
    );

    this.storage.set(
      'plugins',
      this.plugins.load().then((fnc: CallableFunction) => {
        return this.plugins.run(`${this.getPath()}/dist/spices/plugins`, fnc);
      }),
    );

    return true;
  }

  /**
   * Responsável por validar o estado do retorno da função "load".
   */
  async validateToLoad(response: boolean): Promise<void> {
    if (response) return;
    throw 'Oppss, ocorreu um erro no carregamento load.';
  }

  /**
   * A função "run" é responsável pela execução dos componentes carregados.
   * @returns boolean
   */
  async run(): Promise<boolean> {
    this.storage.get('boot').then((data: string[]) => {
      data.forEach((boot: any) => {
        this.storage
          .get('client')
          .on(boot.options.name, (...args: any[]) => {
            return boot.setClient(this.storage.get('client')).run(args)
          });
      });
    });

    this.storage.get('plugins').then((data: string[]) => {
      console.log(data);
    });

    return true;
  }

  /**
   * Responsável por validar o estado do retorno da função "run".
   */
  async validateToRun(response: boolean): Promise<void> {
    if (response) return;
    throw 'Oppss, ocorreu um erro no carregamento run.';
  }
}
