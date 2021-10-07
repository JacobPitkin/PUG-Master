const logger = require('../utilities/logging.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('remove')
	.setDescription('Removes a room with the specified code.')
  .addStringOption(option =>
    option.setName('code')
    .setDescription('The unique room code.')
    .setRequired(true)),
	async execute(interaction) {
    // Maybe add prompt with two button choices asking if they're sure ???

    const code = interaction.options.getString('code').toUpperCase();

    if (interaction.guild.channels.cache.find(i => i.name === `category-${code}`)) {
      interaction.guild.channels.cache.find(i => i.name === `text-${code.toLowerCase()}`).delete();
      interaction.guild.channels.cache.find(i => i.name === `voice-${code}`).delete();
      interaction.guild.channels.cache.find(i => i.name === `category-${code}`).delete();

      logger.info(`User ${interaction.user.username} removed rooms with code '${code}'`);
      return await interaction.reply({ content: `Rooms with code '${code}' have been removed.`, ephemeral: true });
    }
    
    return await interaction.reply({ content: `Room code '${code}' does not exist.'`});
	},
};