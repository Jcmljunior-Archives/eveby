import Boot from '../../core/boot'

export default class Ready extends Boot {
  constructor(storage: any) {
    super({
      name: 'ready'
    })
  }

  async run(): Promise<any> {
    console.log('Running...')
  }
}
