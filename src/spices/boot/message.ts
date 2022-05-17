import { Boot } from '../../core/boot';
import { ParamsManager } from '../../core/params-manager';

export default class Message extends Boot {
  params: ParamsManager;

  constructor() {
    super({
      name: 'message',
    });

    this.params = new ParamsManager();
  }

  run(args: string[]) {
    console.log(args);
  }
}
