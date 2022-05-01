import { Collection } from 'discord.js';

export default abstract class Boot {
  storage: Collection<string, any>;
  options: any;

  constructor(storage?: any, options?: any) {
    this.storage = storage;
    this.options = options;
  }
}
