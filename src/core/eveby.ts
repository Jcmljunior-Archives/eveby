import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import PermissionsManager from './permissions-manager';
import StorageManager from './storage-manager';

export default class Eveby {
  permissions: PermissionsManager;
  discord: Client;
  storage: StorageManager;

  constructor(options: ClientOptions = { intents: [] }) {
    this.permissions = new PermissionsManager();
    this.permissions.get('data').set('intents', options.intents);
    this.storage = new StorageManager();
    this.discord = new Client(options);
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
    this.storage.setState(this.load.name);

    /**
     * Notas:
     */
    this.storage.set('spices', new Collection());
    this.storage.get('spices').set('boot', new Collection());

    console.log(this.storage.get('spices'));

    console.log('Concluído!');
    return true;
  }

  async run(): Promise<boolean> {
    console.log('Iniciando a execução de componentes...');
    this.storage.setState(this.run.name);

    console.log('Concluído!');

    return true;
  }
}
