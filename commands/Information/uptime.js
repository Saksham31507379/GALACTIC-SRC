const { Command } = require("../../utils/command/command");
const { MessageEmbed } = require("discord.js");
const os = require('os')
const moment = require("moment")
const Discord = require('discord.js')
const cpus = require('cpu-stat')
const { duration } = require(`../../handlers/functions`);
const prettyMilliseconds = require("pretty-ms");
const cpuStat = require("cpu-stat");

module.exports = new Command({
  // options
  name: "uptime",
  description: `get's uptime of the bot`,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    
    interaction.followUp({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`I am online  <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`)
      ]
      
    });
    console.log(`uptime.js loaded`)
  },
});
