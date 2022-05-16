export declare type PluginOptions<T> = {
  name: string | T;
};

export class Plugin {
  options: any;

  constructor(options: PluginOptions<any>) {
    this.options = options;
  }
}
