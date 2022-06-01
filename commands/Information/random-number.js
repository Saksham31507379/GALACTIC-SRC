const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');
const vcode = require("voucher-code-generator")

module.exports = new Command({
    name: 'random-number',
    description: `Generate's A Random Number between 0 to 1000`,
    userPermissions: ["VIEW_CHANNEL"],
    
    run: async ({ interaction, }) => {

        const randomnumber = Math.floor(Math.random() * 966 )+ 34


        interaction.followUp(`${randomnumber}`)
    }
    
})