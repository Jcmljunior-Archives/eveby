import { Boot } from '../../core/boot';
import { ParamsManager } from '../../core/params-manager';

export default class messageCreate extends Boot {
  params: ParamsManager;

  constructor() {
    super({
      name: 'messageCreate',
    });

    this.params = new ParamsManager();
  }

  run(args: string[]) {
    console.log('Hello');
  }
}
