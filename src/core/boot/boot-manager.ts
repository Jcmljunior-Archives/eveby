import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Observable } from '../observable';

export default class BootManager extends Observable {
  storage: Collection<string, any>;

  constructor() {
    super();
    this.storage = new Collection();
    this.storage.set('load', new Collection());
    this.storage.set('run', new Collection());
  }

  getPath() {
    return process.cwd() + '/dist/spices/boot/';
  }

  async load(): Promise<boolean> {
    if (this.storage.set('load', readdirSync(this.getPath()))) {
      return Promise.resolve(true);
    }

    return Promise.reject(false);
  }

  async run(): Promise<boolean> {
    if (this.storage.get('load').length) {
      let obj: any;
      this.storage.get('load').forEach((item: string) => {
        obj = require(this.getPath() + item);
        obj = new obj[Object.keys(obj)[0]]();
        this.storage.get('run').set(obj.options.name, obj);
      });
    }

    return Promise.resolve(true);
  }
}
