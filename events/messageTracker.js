const Messages = require("discord-messages")
const client = require("../index")
const { MessageEmbed } = require("discord.js")

Messages.setURL("apka priya mongodb url")
client.on("messageCreate", async(message) => {
    if(message.author.bot) return;
    const AddMessage = await Messages.appendMessage(message.author.id, message.guild.id, 1);
})