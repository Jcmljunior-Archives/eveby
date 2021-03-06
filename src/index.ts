import { Intents } from 'discord.js';
import { Eveby } from './core/eveby';

const EvebyBot = new Eveby({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ],
});

EvebyBot.load()
  .then((response: boolean) => EvebyBot.validateToLoad(response))
  .then(() => EvebyBot.run())
  .then((response: boolean) => EvebyBot.validateToRun(response))
  .then(() => EvebyBot.login());
