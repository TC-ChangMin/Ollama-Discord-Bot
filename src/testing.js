import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";
dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.once('ready', () => {
  console.log(`Testing Grounds...\nLogged in as ${client.user.tag}`);
});

// Event listener for when a message is received
client.on('messageCreate', async (message) => {

  if (message.mentions.has(client.user)) {
    const userMessage = message.content.replace(`<@!${client.user.id}>`, '').replace(/\s+/g, '').trim(); // bot breaks if it has <@...>. this trims it

    
    if (userMessage.length === `<@${client.user.id}>`.length) {
        await message.channel.send("ermm what the sigma? you didn't say anything");
        return;
      }    
  } 
});

// Log in to Discord with your bot's token
client.login(process.env.TOKEN);
