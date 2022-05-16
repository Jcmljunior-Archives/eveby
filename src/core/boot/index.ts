declare type BootOptions = {
  name: string
}

export class Boot {
  options: BootOptions

  constructor(options: BootOptions) {
    this.options = options
  }
}
