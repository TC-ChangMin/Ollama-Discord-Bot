import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST().setToken(process.env.TOKEN);

// Delete all global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);