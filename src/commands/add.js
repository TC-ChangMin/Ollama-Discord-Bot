import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds two numbers together.')
    .addIntegerOption(option =>
      option.setName('num1')
        .setDescription('The first number.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('num2')
        .setDescription('The second number.')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Defer the reply to give more time for processing
    await interaction.deferReply({ ephemeral: true }); // Use ephemeral for testing

    const num1 = interaction.options.getInteger('num1');
    const num2 = interaction.options.getInteger('num2');

    // Debugging info in the console
    console.log(`Received numbers: num1 = ${num1}, num2 = ${num2}`);

    // Check if num1 and num2 are valid
    if (num1 === null || num2 === null) {
      return await interaction.editReply('Error: One of the numbers is invalid.');
    }

    // Perform the addition and reply with the result
    const sum = num1 + num2;
    console.log(`Calculated sum: ${sum}`);

    // Reply with the result
    await interaction.editReply(`The sum is: ${sum}`);
  },
};
