const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'calculator',
    description: `Caclulator`,
    run: async({ client, interaction, args, prefix }) => {
        const simplydjs = require("simply-djs")
        simplydjs.calculator(interaction,{
            embedColor:"ff0000",
            credit: false
        })

    }
})