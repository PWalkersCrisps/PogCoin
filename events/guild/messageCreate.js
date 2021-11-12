require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const coinCooldown = new Set();

module.exports = async(message) =>{


    const profileModel = require("../../models/profileSchema.js");
    const { MessageEmbed } = require('discord.js'); 

    if(message.user.bot) return;

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

    if(message.content === "*quickCheck"){
        message.channel.send("app/events/guild/messageCreate.js works")
    }

    
}