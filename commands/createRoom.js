const logger = require('../utilities/logging.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { guildId } = require('../config.json');
const { InteractionCollector } = require('discord.js');
const tracKRoom = require('../utilities/roomManagement.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('create')
	.setDescription('Creates a private room.'),
	async execute(interaction) {
    let roomCode;

    do {
      roomCode = Math.random().toString(36).substr(2,4).toUpperCase();
    } while (interaction.guild.channels.cache.find(i => i.name === `category-${roomCode}`));

    await interaction.guild.channels.create(`category-${roomCode}`, {
      type: 'GUILD_CATEGORY'
    })
    .then(categoryChannel => {
      interaction.guild.channels.create(`text-${roomCode}`, {
        type: 'GUILD_TEXT',
        parent: categoryChannel
      })
      .catch(error => logger.error(error));

      interaction.guild.channels.create(`voice-${roomCode}`, {
        type: 'GUILD_VOICE',
        parent: categoryChannel
      })
      .catch(error => logger.error(error));

      categoryChannel.permissionOverwrites.create(guildId, { VIEW_CHANNEL: false });
      categoryChannel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true });
      trackRoom(categoryChannel, roomCode);
      logger.info(`User ${interaction.user.username} created rooms with code '${roomCode}'`);
      return interaction.reply({ content: `Created rooms with code '${roomCode}'`, ephemeral: true });
    })
    .catch(error => {
      logger.error(error);
      return interaction.reply({ content: `Could not create a room.`, ephemeral: true });
    });
	},
};