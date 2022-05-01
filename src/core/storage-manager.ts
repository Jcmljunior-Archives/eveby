import { Collection } from 'discord.js';

export default class StorageManager {
  storage: Collection<string, any>;

  constructor() {
    this.storage = new Collection();
    this.storage.set('cache', new Collection());
    this.storage.set('data', new Collection());
  }

  setState(state: string) {
    this.storage.set('state', state);
  }

  set(key: string, val: any, target?: string) {
    if (!target) {
      return this.storage
        .get(this.storage.get('state') == 'load' ? 'data' : 'cache')
        .set(key, val);
    }

    this.storage.get(target).set(key, val);
  }

  get(key: string, target?: string) {
    if (!target) {
      return this.storage
        .get(this.storage.get('state') == 'load' ? 'data' : 'cache')
        .get(key);
    }

    this.storage.get(target).get(key);
  }

  has(key: string, target?: string): boolean {
    if (!target) {
      return this.storage
        .get(this.storage.get('state') == 'load' ? 'data' : 'cache')
        .has(key);
    }

    return this.storage.get(target).has(key);
  }
}
