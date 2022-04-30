import { type ClientOptions, Collection } from 'discord.js'
import StorageManager from '@core/storage-manager'

declare namespace Core {
  export interface StorageManagerInterface {
    storage: Collection<string, any>
    set(key: string, val: any): boolean
    get(key: string): any
    has(key: string): boolean
  }

  export interface StorageInterface {
    storage: StorageManager
  }
}
