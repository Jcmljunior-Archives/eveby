import dotenv from 'dotenv';
import { Collection, Intents } from 'discord.js'
import { Storage } from './storage'

export default class Eveby extends Storage {
  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS
      ]
    })
  }

  formatDays(time: any) {
    return Math.floor(time / 86400000);
  }

  formatHours(time: any) {
    return Math.floor(time / 3600000) % 24;
  }

  formatMinutes(time: any) {
    return Math.floor(time / 60000) % 60;
  }

  formatSeconds(time: any) {
    return Math.floor(time / 1000) % 60;
  }

  async logIn(token?: string): Promise<any> {
    try {
      if (await this.login(token)) {
        return console.log('Conexão realizada com sucesso.')
      }
    } catch (err) {
      throw new Error('Oppsss, erro de conexão.')
    }
  }

  async load(): Promise<boolean> {
    console.log('Loading modules...')
    return true
  }

  async run(): Promise<boolean> {
    console.log('Running modules...')
    
    dotenv.config({
      path: './.env.development'
    })

    this.storage.set('config', new Collection)
    this.storage.get('config').set('bot', {
      token: process.env.IA_TOKEN
    })

    await this.logIn(process.env.IA_TOKEN)

    await setTimeout(() => {
      console.log(this.formatDays(this.uptime))
      console.log(this.formatHours(this.uptime))
      console.log(this.formatMinutes(this.uptime))
      console.log(this.formatSeconds(this.uptime))
      console.log('Done!')
    }, 3000)

    return true
  }

}
