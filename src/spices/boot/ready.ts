import Boot from 'src/core/boot';

export default class Ready extends Boot {
  constructor(storage?: any, options?: any) {
    super(storage, options);
  }

  run() {
    console.log('Estamos Online!');
  }
}
