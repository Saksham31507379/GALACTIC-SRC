const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'vote',
    description: `Get's the vote link of bot`,
    userPermissions: ["VIEW_CHANNEL"],
    options: [
        
    ],
    
    run: async ({ interaction, choices}) => {

        let options = interaction.options

        if(options === "Galactic"){
            console.log(`P`)
        }
        
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Vote For Me On Top.gg`)

        
    }
    
})