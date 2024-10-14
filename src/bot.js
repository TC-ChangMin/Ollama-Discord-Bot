import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";
import ollama from 'ollama';
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
  console.log(`Logged in as ${client.user.tag}`);
});



// Event listener for interactions (including slash commands)
client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isCommand()) { // Check if the interaction is a command
      const { commandName } = interaction;

      if (commandName === 'add') {
        const num1 = interaction.options.getNumber('num1');
        const num2 = interaction.options.getNumber('num2');
        await interaction.reply(`The sum is ${num1 + num2}`);
      }
      if (commandName === 'chat') {
        const promptInput = interaction.options.getString('your-message');
        const promptMessage = { role: 'user', content: promptInput };

        await interaction.reply('One moment while I generate a response...'); // Acknowledge the interaction
        try {
            // Call the Ollama chat function
            const response = await ollama.chat({
                model: 'llama2',
                messages: [promptMessage],
            });

            // Send the response back to the channel
            await interaction.followUp(response.message.content); // Using followUp for a new message
        } catch (error) {
            console.error('Error while processing the message:', error);
            await interaction.followUp("Sorry, I couldn't process your message.");
        }
      }
      
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.reply('There was an error while executing this command!');
  }
});





// Event listener for when a message is received
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const filter = message.content;
  if (filter.toLowerCase().includes('brian')) { 
    await message.channel.send("Never heard of him.");
  }

  if (message.mentions.has(client.user)) {
    // Error check for empty messages
    const userMessage = message.content.replace(`<@!${client.user.id}>`, '').replace(/\s+/g, '').trim(); // bot breaks if it has <@...>. this trims it
    if (userMessage.length === `<@${client.user.id}>`.length) {
      await message.channel.send("You didn't say anything!");
      return;
    }

    // Uncomment this to use the Ollama chat functionality
    /*
    const promptMessage = { role: 'user', content: userMessage };

    await message.channel.send('One moment while I generate a response...');
    try {
      const response = await ollama.chat({
        model: 'llama2',
        messages: [promptMessage],
      });

      await message.channel.send(response.message.content);
    } catch (error) {
      console.error('Error while processing the message:', error);
      await message.channel.send("Sorry, I couldn't process your message.");
    } */
  }
});

// Log in to Discord with your bot's token
client.login(process.env.TOKEN);
