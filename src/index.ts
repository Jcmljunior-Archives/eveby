import { Intents } from 'discord.js';
import Eveby from './core/eveby';

const EvebyBot: Eveby = new Eveby({
  intents: [Intents.FLAGS.GUILDS],
});

EvebyBot.load()
  .then((response: boolean) => EvebyBot.failedToLoad(response))
  .then(() => EvebyBot.run())
  .then((response: boolean) => EvebyBot.failedToRun(response))
  .then(() => EvebyBot.login())
  .finally(() => console.log('Done!'));
