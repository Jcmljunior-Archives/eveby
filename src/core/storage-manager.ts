import { Client, Collection } from 'discord.js'
import { EvebyOptions } from './eveby'

export default class StorageManager extends Client {
  storage: Collection<string, any>

  constructor(clientOptions: EvebyOptions) {
    super(clientOptions)
    this.storage = new Collection()
  }

  has(key: string): boolean {
    return this.storage.has(key)
  }

  set(key: string, val: any): any {
    if (this.storage.has(key)) {
      throw new Error(
        'Oppss, a chave %{name} já foi definida.'.replace('%{name}', key),
      )
    }

    return this.storage.set(key, val)
  }

  get(key: string): any {
    if (!this.storage.has(key)) {
      throw new Error(
        'Oppss, a chave %{name} não foi definida.'.replace('%{name}', key),
      )
    }

    return this.storage.get(key)
  }
}
