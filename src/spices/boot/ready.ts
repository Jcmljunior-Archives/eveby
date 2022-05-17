import { Boot } from '../../core/boot';

export default class Ready extends Boot {
  constructor() {
    super({
      name: 'ready',
    });
  }

  async setActivity(): Promise<any> {
    this.storage?.user.setActivity('!help', { type: 'PLAYING' });
  }

  async run() {
    await this.setActivity()
    console.log('Tudo Pronto.');
  }
}
