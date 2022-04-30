import type { Core } from '@types'
import { Collection } from 'discord.js'

export default class StorageManager implements Core.StorageManagerInterface {
  storage: Collection<string, any>

  constructor() {
    this.storage = new Collection()
  }
  
  set(key: string, val: any): boolean {
    if (this.storage.set(key, val)) {
      return true;
    }

    return false;
  }

  get(key: string): any {
    return this.storage.get(key);
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }
}
