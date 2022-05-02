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

  async setState(target: string): Promise<boolean> {
    this.storage.storage.get('cache').set('state', target);
    this.storage.storage.get('data').set('state', target);
    return true;
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
    new Promise(() => console.log('Iniciando carregamento de eventos...'))
      .then(() => Promise.resolve(this.boot.load()))
      .catch(() => {
        throw new Error(
          'Oppss, não foi possível concluír o carregamento de eventos!',
        );
      });

    return Promise.resolve(true);
  }

  async run(): Promise<boolean> {
    new Promise(() => console.log('Iniciando a execução de eventos...'))
      .then(() => Promise.resolve(this.boot.run()))
      .catch(() => {
        throw new Error(
          'Oppss, não foi possível concluír a execução de eventos!',
        );
      });

    return Promise.resolve(true);
  }
}
