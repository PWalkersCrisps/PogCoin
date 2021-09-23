const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const fs = require("fs");

const prefix = ">";

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`${client.user.tag} is online, hopefully it works`);
});

client.on("messageCreate", async (message) =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case "ping":
            client.commands.get('ping').execute(client, message, args, Discord);
            break;
    }
})

client.login("ODkwNjczNzQ4NTQ0NDc1MTQ2.YUzOkQ.piSRs8KilpeL9YL4FnHGXisBih4");