import { Client } from 'discord.js';

declare type BootOptions = {
  name: string;
};

export class Boot {
  storage?: Client;
  options: BootOptions;

  constructor(options: BootOptions) {
    this.options = options;
  }

  /**
   * Define o cliente discord.
   * @param storage 
   * @returns 
   */
  setClient(storage: Client) {
    this.storage = storage;
    return this;
  }
}
