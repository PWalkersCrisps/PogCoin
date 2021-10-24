require("dotenv").config();

const cooldowns = new Map();
const coinCooldown = new Map();

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
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const currentTime = Date.now();
    
        const timeStamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldowns) * 1000;
        
        if(timeStamps.has(message.author.id)){
            const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;
    
            if(currentTime < expirationTime){
                const timeLeft = (expirationTime - currentTime) / 1000;
    
                return message.channel.send(`<@${message.author.id}> look i know pogcoin is exciting and all, but i dont think its exciting when literally no one can see the chat.\nCould you wait like ${timeLeft.toFixed(1)} more seconds?`);
            }
        }
    
        timeStamps.set(message.author.id, currentTime);
        setTimeout(() => timeStamps.delete(message.author.id))    
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