import { Information } from '.';

export class Uptime extends Information {
  constructor() {
    super({
      name: 'uptime',
    });
  }

  run() {
    console.log(':)');
  }
}
