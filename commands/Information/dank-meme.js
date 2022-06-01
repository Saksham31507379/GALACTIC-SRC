const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { userInfo } = require('os');
const res = require('axios')
const axios = require('axios')

module.exports = new Command({
    name: 'dank-meme',
    description: `Generate's A dank-meme Use at your own risk`,
    userPermissions: ["VIEW_CHANNEL"],
    run: async ({ interaction }) => {
        let res = await axios.default.get(
            `https://www.reddit.com/r/PornoMemes/random.json`
        );
        
        if (!res || !res.data || !res.data.length)
        return interaction.followUp(`Error`);

        if(!interaction.channel.nsfw){
            return interaction.followUp(`This Command Can Be Used In Nsfw Channels`)
        }

        res = res.data[0].data.children[0].data;
        const Embed = new MessageEmbed()
        .setTitle(`${res.title}`)
        .setColor("RANDOM")
        .setImage(`${res.url}`)
        .setFooter(`Note: Memes Are Generated from Reddit use this command if u are 18+`)
        .setDescription(`${res.headers}`)

        interaction.followUp({embeds: [Embed]})
    }
})