import { readdirSync } from 'fs';

export class BootManager {
  async load(): Promise<CallableFunction> {
    return function (path: string) {
      return readdirSync(path);
    };
  }

  async run(path: string, fnc: CallableFunction): Promise<string[]> {
    const data: string[] = fnc(path);
    let response: string[] = [];
    let obj: any;

    if (!data.length) return [];

    Object.keys(data).forEach((key: any) => {
      /**
       * Bloqueio de arquivos com extensões diferentes.
       */
      if (!data[key].endsWith('.js')) return;

      obj = require(`${path}${data[key]}`);
      obj = new obj[Object.keys(obj)[0]]();

      response[key] = obj;
    });

    return response;
  }
}
