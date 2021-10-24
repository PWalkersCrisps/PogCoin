const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const prefix = process.env.DISCORD_PREFIX;
const mongoose = require("mongoose");
const profileModel = require("../../models/profileSchema.js");
const { MessageEmbed } = require('discord.js'); 
const fs = require("fs");

const coinCooldown = new Set();

require("dotenv").config();

///-----Command/Event Handlers-----///

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.events = new Discord.Collection();

try{
    ['event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord)
    })
}
catch(err){
    console.log(err);
}

///-----Mongoose-----///
mongoose.connect(process.env.MONGODB_SRV, { //idk what this shit does
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to the MongoDB database`)
}).catch((err) => {
    console.log(err);
});

///-----Executes When Message Is Created-----///
client.on("messageCreate", async(message) => {

    ///-----CMD execution-----///

    if(!message.content.startsWith(prefix) || message.author.bot) return; //if the message didnt start with the bot's prefix, it just goes back to the start

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(command)
    console.log(command.toString())

    try{
        client.commands.get(command).execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
    }
    catch(err){
        message.channel.send("Damn... there was an error trying to execute this command, if this error persists DM PWalkersCrisps about it")
        console.log(err);
    }
});

///-----Login-----///
client.login(process.env.DISCORD_TOKEN); //this is the token of the bot

