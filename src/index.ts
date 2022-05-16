import { Intents } from 'discord.js';
import { Eveby } from './core/eveby';

const EvebyBot = new Eveby({
  intents: [Intents.FLAGS.GUILDS],
});

EvebyBot.load()
  .then((response: boolean) => EvebyBot.validateToLoad(response))
  .then(() => EvebyBot.run())
  .then((response: boolean) => EvebyBot.validateToRun(response))
  .then(() => EvebyBot.login());
