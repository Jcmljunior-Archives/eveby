import type { Core } from '@types'
import { Client, type ClientOptions } from 'discord.js'
import StorageManager from './storage-manager'

export abstract class Storage extends Client implements Core.StorageInterface {
  storage: StorageManager

  constructor(options: ClientOptions) {
    super(options)
    this.storage = new StorageManager()
  }

}
