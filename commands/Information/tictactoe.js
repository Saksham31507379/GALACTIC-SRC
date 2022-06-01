const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'tictactoe',
  description: 'Tic Tac Toe Game',
  options: [{
        name: 'user',
        type: 'USER',
        description: 'User To Play With',
        required: true,
      }],
      run: async({ interaction }) => {
          const user = interaction.options.getUser('user')
          const simplydjs = require("simply-djs")
          simplydjs.tictactoe(interaction,{
            embedColor:"ff0000",
            credit: false
        })
      }
})