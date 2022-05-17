import { Collection } from 'discord.js';

export class ParamsManager {
  storage: Collection<string, any>;

  constructor() {
    this.storage = new Collection();
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  set(key: string, val: any): boolean {
    if (this.storage.has(key)) return false;
    this.storage.set(key, val);
    return true;
  }

  get(key: string): any {
    if (!this.storage.has(key)) return false;
    return this.storage.get(key);
  }
}
