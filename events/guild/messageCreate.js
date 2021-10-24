require("dotenv").config();

const cooldowns = new Map();
const coinCooldown = new Set();

module.exports = async(Discord, client, message) =>{

    const mongoose = require("mongoose");
    const profileModel = require("../../models/profileSchema.js");
    const { MessageEmbed } = require('discord.js'); 

    const prefix = process.env.DISCORD_PREFIX;

    if(message.author.bot) return;

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
        console.log(err) //if mongoose had a problem trying to create a new user, then it will log it in the console rather then crashing
    }

    ///-----Pogcoin RNG-----//

    let randomCoinChance = Math.floor(Math.random() * 500)+1 //makes up a random number when a message is created
    if (randomCoinChance === 1){ //if the random number is equal to 1 then it will start the proccess of giving a pog coin

        if (!coinCooldown.has(message.author.id)) { //goes to check if the cooldowns map *DOESNT* habe the author's
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id, //looks for the id of the author
            }, {
                $inc: {
                    coins: 1, //when the id of the author is found, it gives them one coin
                    totalCoinsEarnt: 1
                }
            });
            

            const pogCoinEmbedReward = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Reddit Gold Replacement?');    
            
            if (message.member.roles.cache.some(role => role.name === 'he/him')){ //checks if the auther has the he/him role
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good boy`},
                )        
            }
            else if (message.member.roles.cache.some(role => role.name === 'she/her')){ //checks if the auther has the she/her role
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good girl`},
                )        
            }
            else{ //If the user has the they/them or dont have a gender role, it will always default to this
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good child`},
                )            
            }

            message.author.send({ embeds: [pogCoinEmbedReward] }); //sends the embed that was just created
            
            coinCooldown.add(message.author.id); //Adds a cooldown to the id of the author
            setTimeout(() => {
                // Removes the user from the set after a while
                coinCooldown.delete(message.author.id);
            }, 60 * 60000); //First number is minutes the second one times it because it is in milliseconds        
        }
    }

    if(!message.content.startsWith(prefix)) return; //if the message didnt start with the bot's prefix, it just goes back to the start

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //-----Cooldowns-----///
    try{
        const collection = new Discord.Collection();

        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, collection());
        }
    
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;
    
        //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
        if(time_stamps.has(message.author.id)){
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    
            if(current_time < expiration_time){
                const time_left = (expiration_time - current_time) / 1000;
    
                return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
            }
        }
    
        //If the author's id is not in time_stamps then add them with the current time.
        time_stamps.set(message.author.id, current_time);
        //Delete the user's id once the cooldown is over.
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    }
    catch(err){
        console.log(err);
    }
    ///-----CMD execution-----///

    try{
        command.execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
    }
    catch(err){
        message.channel.send("Damn... there was an error trying to execute this command, if this error persists DM PWalkersCrisps about it")
        console.log(err);
    }
    
}