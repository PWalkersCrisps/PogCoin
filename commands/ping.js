module.exports = {
    name: "ping",
    description: "pings the server to see the delay between the client and the server",
    async execute(client, message, args, Discord){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms.`) //Its creates a time stamp for the message then compares it to when the message is actually sent to get a mostly accurate representation of the Client/Server delay
    }
}