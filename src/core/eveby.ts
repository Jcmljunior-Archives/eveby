import { Client, ClientOptions } from 'discord.js';
import BootManager from './boot-manager';
import PermissionsManager from './permissions-manager';
import StorageManager from './storage-manager';

export default class Eveby {
  permissions: PermissionsManager;
  discord: Client;
  storage: StorageManager;
  boot: BootManager;

  constructor(options: ClientOptions = { intents: [] }) {
    this.permissions = new PermissionsManager();
    this.permissions.get('data').set('intents', options.intents);
    this.storage = new StorageManager();
    this.discord = new Client(options);
    this.boot = new BootManager(this.discord, this.storage);
  }

  async login(token?: string): Promise<any> {
    try {
      if (await this.discord.login(token)) {
        console.log('Conexão realizada com sucesso.');
        return true;
      }
    } catch (err) {
      throw new Error('Oppsss, erro de conexão.');
    }
  }

  async load(): Promise<boolean> {
    console.log('Iniciando o carregamento de componentes...');
    // this.storage.setState(this.load.name);

    this.boot.load();

    console.log('Concluído!');
    return true;
  }

  async run(): Promise<boolean> {
    console.log('Iniciando a execução de componentes...');
    // this.storage.setState(this.run.name);

    this.boot.run();

    console.log('Concluído!');

    return true;
  }
}
