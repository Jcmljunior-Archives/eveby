import { config } from 'dotenv'
import { ClientOptions } from 'discord.js'
import BootManager from './boot/boot-manager'
import StorageManager from './storage-manager'

export declare type EvebyOptions = ClientOptions

export default class Eveby {
  storage: StorageManager
  boot: any

  constructor(clientOptions: EvebyOptions) {
    this.storage = new StorageManager(clientOptions)
  }

  async login(): Promise<boolean> {
    config({
      path: './.env.dev',
    })

    if (await this.storage.login(process.env.EVEBY_TOKEN)) {
      return Promise.resolve(true)
    }

    return Promise.reject(false)
  }

  async bootRun(response: boolean): Promise<boolean> {
    if (!response) return Promise.resolve(false)
    this.boot.storage.get('run').forEach((boot: any) => {
      this.storage.on(boot.options.name, (...args: any[]) => {
        boot.register(this.storage)
        boot.run()
      })
    })

    return Promise.resolve(true)
  }

  /**
   * Responsável pelo carregamento de componentes.
   */
  async load(): Promise<boolean> {
    this.boot = new BootManager()
    this.boot.load()

    return Promise.resolve(true)
  }

  /**
   * Responsável por validar o retorno da função load.
   * @param response Se a resposta for diferente de verdadeiro, retorna uma
   * mensagem de erro.
   */
  async failedToLoad(response: boolean): Promise<void> {
    if (!response) {
      throw new Error('Oppss, ocorreu um erro durante o carregamento...')
    }
  }

  /**
   * Responsável pela execução dos componentes previamente carregados.
   */
  async run(): Promise<boolean> {
    this.boot.run().then((response: boolean) => this.bootRun(response))

    return true
  }

  /**
   * Responsável por validar o retorno da função load.
   * @param response Se a resposta for diferente de verdadeiro, retorna uma
   * mensagem de erro.
   */
  async failedToRun(response: boolean): Promise<void> {
    if (!response) {
      throw new Error('Oppss, ocorreu um erro durante a execução...')
    }
  }
}
