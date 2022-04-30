import Eveby from "./core/eveby"

const bot: any = new Eveby()

bot.load().then((resp: boolean) => {
  if(!resp) throw new Error('Oppss, não foi possível concluir o carregamento dos modulos.')
}).then(() => bot.run())
