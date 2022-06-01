const { Command } = require('reconlx')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'backup-load',
    description: `Load's A Backup On Your Server`,
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'backupid',
            description: `Backup ID to be loaded`,
            type: 'STRING',
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const id = interaction.options.getString('backupid')

        /**
 * @param {string} [backupID] - The ID of the backup that you want to load
 * @param {Guild} [Guild] - The discord server on which you want to load the backup
 */
         if(!interaction.guild.me.permissions.has("ADMINISTRATOR")){
            return interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`I Require \`ADMINISTRATOR\` Permissions To Create Backup!`)
                ]
            })
        }
        const backupembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Your Backup Was Loaded Successfully `)
interaction.channel.send(`Loading Backup...`)
const backup = require("discord-backup");
backup.load(id, interaction.guild).catch((err) => {
    interaction.user.send
    // if the backup wasn't found
    return interaction.followUp({
        embeds: [
            new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setDescription(`Invalid Backup ID`)
        ]
    })
});

    }
})