import { Client } from 'discord.js';
import StorageManager from './storage-manager';

export default class BootManager {
  storage: StorageManager;
  discord: Client;

  constructor(discord: Client, storage: StorageManager) {
    this.discord = discord;
    this.storage = storage;
  }

  async load(): Promise<any> {
    console.log('Carregando eventos...');
    console.log('Concluído!');
  }

  async run(): Promise<any> {
    console.log('Executando eventos...');
    console.log('Concluído!');

    console.log(this);
  }
}
