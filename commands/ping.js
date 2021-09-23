const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

module.exports = {
    name: "ping",
    description: "pings the server to see the delay between the client",
    async execute(client, message, args, Discord){
        message.channel.send(`🏓Latency is ${message.createdTimestamp - Date.now()}ms.`)
    }
}