const logger = require('../utilities/logging.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { guildId } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join a private room.')
    .addStringOption(option =>
      option.setName('code')
        .setDescription('The unique room code.')
        .setRequired(true)),
  async execute(interaction) {
    const code = interaction.options.getString('code').toUpperCase();
    let channel = interaction.guild.channels.cache.find(i => i.name === `category-${code}`);

    if (channel) {
      channel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true });
      logger.info(`User ${interaction.user.username} got access to rooms with code '${code}'`);
      return interaction.reply({ content: `Added you to room ${code}`, ephemeral: true });
    }

    return interaction.reply({ content: `Room with code '${code}' does not exist.`, ephemeral: true });
  },
};
