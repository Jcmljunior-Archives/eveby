import { readdirSync } from 'fs';

export class PluginManager {
  constructor() {}

  async load(): Promise<CallableFunction> {
    return function (path: string) {
      return readdirSync(path);
    };
  }

  async run(path: string, fnc: CallableFunction): Promise<string[]> {
    const ls_dir: string[] = fnc(path);
    let response: string[] = [];
    let obj: any;

    if (!ls_dir.length) return [];

    ls_dir.forEach((dir: string) => {
      this.load()
        .then((fnc: CallableFunction) => fnc(`${path}/${dir}`))
        .then((data: string[]) => {
          if (!data.length) return [];
          data.forEach((plugin, position: number) => {
            /**
             * Filtra os plugins.
             * Bloqueia arquivos diferentes de .js
             * Bloqueia a categoria da extensão.
             */
            if (!plugin.endsWith('.js')) return;
            if (plugin.indexOf('index') !== -1) return;

            obj = require(`${path}/${dir}/${plugin}`);
            obj = obj[Object.keys(obj)[0]];

            response[position] = obj;
          });
        });
    });

    return response;
  }
}
