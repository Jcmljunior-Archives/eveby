import dotenv from 'dotenv';
import { Intents } from 'discord.js';
import Eveby from './core/eveby';

const EvebyBot = new Eveby({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

EvebyBot.load()
  .then((response: boolean) => {
    if (!response)
      throw new Error(
        'Oppss, não foi possível concluir o carregamento dos modulos.',
      );
  })
  .then(() => EvebyBot.run())
  .then((response: boolean) => {
    if (!response) {
      throw new Error(
        'Oppss, não foi possível concluir a execução dos modulos.',
      );
    }
  })
  .then(() => {
    dotenv.config({
      path: './.env.development',
    });

    return EvebyBot.login(process.env.IA_TOKEN);
  })
  .then((response: boolean) => {
    if (!response) {
      throw new Error(
        'Oppss, não foi possível concluir a conexão a plataforma Discord.',
      );
    }
  })
  .finally(() => console.log('Concluído!'));
