import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

console.log(`OLLAMA: ${process.env.OLLAMA}`); // Debugging line

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

console.log('Attempting to log in...'); // Debugging line

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await checkServerStatus();
});

async function checkServerStatus() {
    const server = process.env.OLLAMA;

    console.log(`Checking server status for: ${server}`); // Debugging line

    try {
        const response = await axios.get(server);
        console.log(`Server is running: ${response.data}`);
    } catch (error) {
        console.error(`Error checking server status: ${error}`);
    }
}



//==================================================================================================
client.on(Events.MessageCreate, async (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message mentions the bot
    if (message.mentions.has(client.user)) {

        const userMessage = message.content;
        console.log(`Bot has been pinged. Message content: ${userMessage}`)
    }
});

client.login(process.env.TOKEN).catch(error => {
    console.error(`Error logging in: ${error}`);
});