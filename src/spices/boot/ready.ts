export default class Ready {
  options: any;

  constructor() {
    this.options = {
      name: 'ready',
    };
  }

  async run(): Promise<any> {
    console.log('Running...');
  }
}
