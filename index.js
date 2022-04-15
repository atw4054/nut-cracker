const { Client, Intents, WebhookClient } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
//const keepAlive = require("./server");
const moment = require("moment");
const cron = require("node-cron");
require('dotenv').config();

const guild = client.guilds.cache.get('964244555635490957');
// const mentionHook = new WebhookClient({ id: "963673084672503849", token: "Thm_BdZFsKtLIIVnHKR1AxKcA9RYagzs4-Zv3IWomYi_21Iw3EJKWvnwxT2KA0TgiZOJ" });
const statusHook = new WebhookClient({ id: "964335225175965766", token: "YuKf2hPEnjr3BCYrX3-lLF_6-QL8ZYP0P28DYbXyRTTmfSO61lyar5kBSZmOYuiRIgsY"});

client.once('ready', async () => {
    console.log('Ready!');
    try {
      await cron.schedule('51 15 * * Mon-Fri', async () => {
        console.log('Trigger standup meeting schedule');
        let statusChannel = client.channels.cache.get('964244556109451284');
        let today = moment().format('MM/DD');
        const thread = await statusChannel.threads.create({
            name: `${today} Status`,
            autoArchiveDuration: 60,
            reason: 'daily scrum',
        });
      
        console.log(`Created thread: ${thread.name}`);
      
        await statusHook.send(`${today} Status`, { threadId: thread.id, });
        await guild.createChannel("daily scrum test", "voice");
      });
    } catch (error) {
      console.error('Error trying to send: ', error);
    }
  });

  client.login(process.env.TOKEN);