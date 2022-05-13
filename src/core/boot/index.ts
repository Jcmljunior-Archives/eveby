import StorageManager from "../storage-manager"

declare type BootOptions = {
  name: string
}

export default abstract class Boot {
  options: BootOptions
  storage?: StorageManager

  constructor(options: BootOptions) {
    this.options = options
  }

  register(storage: StorageManager) {
    this.storage = storage
  }
}
