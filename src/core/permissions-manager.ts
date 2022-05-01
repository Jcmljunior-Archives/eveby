import { Collection } from "discord.js"

export default class PermissionsManager {
  storage: Collection<string, any>

  constructor() {
    this.storage = new Collection
    this.storage.set('cache', new Collection)
    this.storage.set('data', new Collection)
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
