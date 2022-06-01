const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`);
const Discord = require('discord.js')
const os = require('os')
const prettyMilliseconds = require('pretty-ms')
const { connection } = require("mongoose")
const ms = require('ms')
const emoji = require(`../../settings/config`).emoji
const { duration } = require(`../../handlers/functions`);
const { stat } = require("fs");
const { pid } = require("process");
const cpu = require("cpu-stat");
const { default: mongoose } = require("mongoose");

module.exports = new Command({
  // options
  name: `stats`,
  description: `Info About Client`,
  userPermissions: [`SEND_MESSAGES`],
  botPermissions: [`SEND_MESSAGES`],
  category: `Information`,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    const channel = client.channels.cache.size
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
      let users = client.users.cache.get("788745942777462794")
    const channels = client.channels
    let days =  Math.floor(client.uptime / 86400000)
    let hours = Math.floor(client.uptime / 360)
    let minutes = Math.floor(client.uptime / 86400000)
    let seconds = Math.floor(client.uptime / 86400000)
    
    interaction.followUp({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff000")
        .setDescription(`Stats From ${client.user.username}`)
          .addField(`Guilds`, `${client.guilds.cache.size}`, true)
          .addField(`Users`, `${mcount}`, true)
          .addField(`Total Channels`, `${client.channels.cache.size}`)
          
          
      ]
    })
    

   
  },
});
