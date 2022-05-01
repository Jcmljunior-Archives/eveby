import { Client, Collection, Intents } from 'discord.js';
import PermissionsManager from './permissions-manager';
import StorageManager from './storage-manager';

export default class Eveby {
  permissions: PermissionsManager;
  discord: Client;
  storage: StorageManager;

  constructor(options: any = { intents: [] }) {
    this.permissions = new PermissionsManager();
    this.permissions
      .get('data')
      .set('intents', [Intents.FLAGS.GUILDS].concat(options.intents));

    this.storage = new StorageManager();

    this.discord = new Client({
      intents: this.permissions.get('data').get('intents'),
    });
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

    // this.storage.set('addons', new Collection());
    this.storage.set('extensions', new Collection());

    console.log(this.storage.has('addons'));

    console.log('Concluído!');
    return true;
  }

  async run(): Promise<boolean> {
    console.log('Iniciando a execução de componentes...');
    this.storage.setState(this.run.name);

    this.storage.set('addons', new Collection());
    this.storage.set('extensions', new Collection());

    console.log(this.storage.has('addons'));
    console.log(this.storage.has('addons', 'data'));

    console.log('Concluído!');

    return true;
  }
}
