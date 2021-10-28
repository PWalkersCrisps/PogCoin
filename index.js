const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const prefix = process.env.DISCORD_PREFIX;
const mongoose = require("mongoose");
const profileModel = require("./models/profileSchema.js");
const { MessageEmbed } = require('discord.js'); 
const fs = require("fs");

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
    console.error(err);
}

///-----Mongoose-----///
mongoose.connect(process.env.MONGODB_SRV, { //idk what this shit does
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to the MongoDB database`)
}).catch((err) => {
    console.error(err);
});

///-----Executes When Message Is Created-----///
client.on("messageCreate", async(message) => {

    let profileData;
    try{

        profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id
        if(!profileData) //Checks if the user has any data in the DB
        {
            let newUser = await profileModel.create({
                userID: message.author.id,
                coins: 1,
                dailyTimestamp: 0,
                robTimestamp: 0,
                totalCoinsEarnt: 0,
                coinsDonated: 0,
                coinsReceived: 0,
                netGamble: 0,
                robSuccess: 0,
                robFails: 0,
                timesRobbed: 0,
            });
            //const savedUser = await newUser.save();
        }
    } 
    catch(err){
        console.error(err) //if mongoose had a problem trying to create a new user, then it will log it in the console rather then crashing
    }

    ///-----CMD execution-----///

    if(!message.content.startsWith(prefix) || message.author.bot) return; //if the message didnt start with the bot's prefix, it just goes back to the start

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try{
        client.commands.get(command).execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
    }
    catch(err){
        console.log("cmd error");
    }
});

///-----Login-----///
client.login(process.env.DISCORD_TOKEN); //this is the token of the bot

