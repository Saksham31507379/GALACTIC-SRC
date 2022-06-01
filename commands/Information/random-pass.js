const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');
const vcode = require("voucher-code-generator")

module.exports = new Command({
    name: 'random-pass',
    description: `Generate's A Random Pass`,
    userPermissions: ["VIEW_CHANNEL"],
    
    run: async ({ interaction, }) => {

        let codes = [];
        
        let gcode = vcode.generate({
            pattern: "1##1-1##1-###1"
        })
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Check Your Dm's Sent Pass**`)

        

        interaction.followUp({embeds: [embed]})

        const code = gcode.toString().toLowerCase();

        let passembed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Hey ${interaction.user}, Generated A Password!
        
         __Password__- ||\`${code}\`||**`)

        interaction.user.send({embeds: [passembed]})

        
    }
    
})