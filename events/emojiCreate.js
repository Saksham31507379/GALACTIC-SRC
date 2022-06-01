const { MessageEmbed } = require("discord.js");
const client = require("..");


client.on("emojiCreate", async(emoji) => {
    const authpr = emoji.fetchAuthor()
    const emojiChannel = client.channels.cache.get("958633869832253460")
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Emoji Created!")
    .addField(`Uploaded By`, `${authpr}`, true)
    .addField(`Emoji`, `${emoji}`, true)
    .addField(`Name`, `${emoji.name}`, true)
    .addField(`Animated Emoji`, `${emoji.animated ? "<:sh_tick:958961439853395988>" : "<:sh_cross:958962612454961182>"}`)

    emojiChannel.send({embeds: [embed]})
})