const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { userInfo } = require('os');
const res = require('axios')
const axios = require('axios')

module.exports = new Command({
    name: 'meme',
    description: `Generate's A meme from reddit`,
    userPermissions: ["VIEW_CHANNEL"],
    run: async ({ interaction }) => {
        let res = await axios.default.get(
            `https://www.reddit.com/r/Pornokmemes/random/.json`
        );
        if (!res || !res.data || !res.data.length)
        return interaction.followUp(`Error`);

        res = res.data[0].data.children[0].data;
        const Embed = new MessageEmbed()
        .setTitle(`${res.title}`)
        .setImage(res.url)
        .setColor("RANDOM")

        interaction.followUp({embeds: [Embed]})
    }
})