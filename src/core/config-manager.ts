import { Collection } from "discord.js";
import { EvebyConfig } from '../config'

export class ConfigManager {
  private storage: Collection<string, any>

  constructor() {
    this.storage = new Collection()

    let config: any = EvebyConfig
    Object.keys(config).forEach((key: string) => {
      return this.storage.set(key, config[key])
    })
  }

  has(key: string): boolean {
    return this.storage.has(key)
  }

  set(key: string, val: any): boolean {
    if (this.storage.has(key)) return false
    this.storage.set(key, val)
    return true
  }

  get(key: string): any {
    if (!this.storage.has(key)) return false
    return this.storage.get(key)
  }
}
