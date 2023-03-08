let rooms = new Map();

function trackRoom(channel, code) {
  // This is the function to be exported.
  rooms.set(code, channel);
  setTimeout(() => {
    removeRoom(channel, code);
  }, 5000);
}

function removeRoom(channel, code) {
  // Internal remove function, private.
  if (rooms.has(code)) {
    channel.guild.channels.cache.find(i => i.name === `text-${code.toLowerCase()}`).delete();
    channel.guild.channels.cache.find(i => i.name === `voice-${code}`).delete();
    channel.guild.channels.cache.find(i => i.name === `category-${code}`).delete();
    rooms.delete(code);
    // interaction.guild.channels.cache.find(i => i.name === `text-${code.toLowerCase()}`).delete();
    // interaction.guild.channels.cache.find(i => i.name === `voice-${code}`).delete();
    // interaction.guild.channels.cache.find(i => i.name === `category-${code}`).delete();
  }
}

module.exports = {
  trackRoom
};