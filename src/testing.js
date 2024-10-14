// register commands manually
import dotenv from 'dotenv';
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
dotenv.config();

const commands = [
    {
        name: 'add',
        description: 'Adds two numbers!',
        options: [
            {
                name: 'num1',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'num2',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'chat',
        description: 'Have a conversation in memory with the bot',
        options: [
            {
                name: 'your-message',
                description: 'say what you want to Ollama',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'generate',
        description: 'Generate a one time use response',
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing application ${commands.length} (/) commands.`);

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [] },
        );

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
