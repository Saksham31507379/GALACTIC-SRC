const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = require("../../index")
const { Command } = require('reconlx');
const Messages = require("discord-messages")

module.exports = new Command({
    name: 'messages-leaderboard',
    description: `Display's Leaderboard of Messages`,
    userPermissions: ["VIEW_CHANNEL"],
    run: async ({ interaction }) => {
        const rawLeaderboard = await Messages.fetchLeaderboard(interaction.guildId, 10); // We grab top 10 users with most message(s) in the current server.

if (rawLeaderboard.length < 1) return interaction.followUp({
    embeds: [
        new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Well!, I am Sad To Say Nobody's there in Leaderboard 😔**`)
        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`)
    ]
})

const leaderboard = await Messages.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nMessages Count: ${e.messages}`); // We map the outputs.

interaction.followUp({
    embeds: [
        new MessageEmbed()

.setColor("BLUE")   
.setTitle(`${interaction.guild.name}'s Leaderboard`)
.setDescription(`<a:sh_messages:971441432965554196> **__Messages Leaderboard__** - 
${lb.join("\n\n")}`) 
]
})
    }
    
})