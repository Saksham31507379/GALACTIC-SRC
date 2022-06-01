const { Command } = require('reconlx')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'backup-info',
    description: `Load's A Backup On Your Server`,
    options: [
        {
            name: 'backupid',
            description: `Backup ID of which you want info`,
            type: 'STRING',
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const id = interaction.options.getString('backupid')

        /**
 * @param {string} [backupID] - The ID of the backup that you want to load
 */
         const backup = require("discord-backup");
         backup.fetch(id).then((backupInfos) => {
             interaction.followUp({
                 embeds: [
                     new Discord.MessageEmbed()
                     .setColor("BLUE")
                     .setTitle(`BACKUP-INFO`)
                     .addField(`Backup ID`, `\`${backupInfos.id}\``, false)
                     .addField(`Backup Size`, `${backupInfos.size}kb`)
                     .addField(`Backup Created In`, `${backupInfos.data.name}`)
                 ]
             })
             /*
             {
                 id: "BC5qo",
                 size: 0.05
                 data: {BackupData}
             }
             */
         });
    }
})