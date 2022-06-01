const { Command } = require('reconlx')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'backup-create',
    description: `Create's A Backup For Your Server`,
    

    run: async({ interaction }) => {
        
        if(!interaction.guild.me.permissions.has("ADMINISTRATOR")){
            return interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`I Require \`ADMINISTRATOR\` Permissions To Create Backup!`)
                ]
            })
        }
        if(!interaction.member.permissions.has("ADMINISTRATOR")){
            return interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`U Require \`ADMINISTRATOR\` Permissions To Create Backup!`)
                ]
            })
        }
        interaction.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`**Plz Wait 2mins Till Your Backup gets created You Will Be Dmed when it gets ready**`)
                .addField(`Security Purposes`, `**Don't Share BackupID With Anyone He/she Can Delete The Backup if they get That ID**`, true)
                .addField(`Important Notice`, `**When You Will Load The Backup You Will Not Get Any Confirmation Message The Backup Would Be Loaded Immedieatly**`, true)
                .addField(`Safety`, `**For Safety Purposes Once U Load  Backup BackupID Would Be Deleted You Will Have To Create A New One!**`)
            ]
        })
        const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/Storage/");

/**
 * @param {Guild} [Guild] - The discord server you want to backup
 * @param {object} [Options] - The backup options
 */

       
        backup.create(interaction.guild).then((backupData) => {
            interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("NAVY")
                    .setDescription(`Check Your Dm's ${interaction.user}`)
                ],
            ephemeral: true}) // NSJH2
            interaction.user.send({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`**Your Backup Was Successfully created!**`)
                    .addField(`Backup ID`, `\`${backupData.id}\``, true)
                ]
            })
        });
    }
})