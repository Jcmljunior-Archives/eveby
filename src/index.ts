import dotenv from 'dotenv';
import { Intents } from 'discord.js';
import Eveby from './core/eveby';

const EvebyBot: Eveby = new Eveby({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

EvebyBot.setState('data')
  .catch(() => {
    throw new Error('Oppss, não foi possível setar o estado data.');
  })
  .then(() => console.log('Iniciando o carregamento de Componentes...'))
  .then(() => EvebyBot.load())
  .catch(() => {
    throw new Error(
      'Oppss, não foi possível concluir o carregamento de Componentes.',
    );
  })
  .then(() => console.log('Concluído o carregamento de componentes!'))
  .then(() => EvebyBot.setState('cache'))
  .catch(() => {
    throw new Error('Oppss, não foi possível setar o estado cache.');
  })
  .then(() => console.log('Iniciando a execução de Componentes...'))
  .then(() => EvebyBot.run())
  .catch(() => {
    throw new Error('Oppss, não foi possível concluir a execução dos modulos.');
  })
  .then(() => console.log('Concluído!'))
  .then(() => {
    dotenv.config({
      path: './.env.development',
    });

    return EvebyBot.login(process.env.IA_TOKEN);
  })
  .catch(() => {
    throw new Error(
      'Oppss, não foi possível concluir a conexão a plataforma Discord.',
    );
  })
  .finally(() => console.log('Aplicação completamente carregada!'));
