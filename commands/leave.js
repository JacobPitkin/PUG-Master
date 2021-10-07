const logger = require('../utilities/logging.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('leave')
	.setDescription('Leave a room with the specified code.')
  .addStringOption(option =>
    option.setName('code')
    .setDescription('The unique room code.')
    .setRequired(false)),
	async execute(interaction) {
    const code = interaction.options.getString('code');

    if (code) {
      let category = interaction.guild.channels.cache.find(i => i.name === `category-${code}`);

      if (category) {
        category.permissionOverwrites.delete(interaction.user.id);
        logger.info(`User ${interaction.user.username} removed from rooms with code '${code}'`);
        return interaction.reply({ content: `Removed from rooms with code '${code}'`, ephemeral: true });
      }

      return interaction.reply({ content: `Room with code '${code}' does not exist.`, ephemeral: true });
    } else {
      return interaction.reply({ content: `Please provide a room code to leave.`, ephemeral: true });
    }
	},
};