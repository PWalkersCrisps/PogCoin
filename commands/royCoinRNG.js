const cooldowns = new Set();
const mongoose = require("mongoose");

module.exports = {
    name: "ping",
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, message, args, profileModel, profileData, MessageEmbed){

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id, //looks for the id of the author
        }, {
            $inc: {
                coins: 1, //when the id of the author is found, it gives them one coin
            }
        });
        
        const royCoinEmbedReward = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');    
        
        if (message.member.roles.cache.some(role => role.name === 'he')){ //checks if the auther has the he/him role
            royCoinEmbedReward.addFields(
                { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good boy`},
            )        
        }
        else if (message.member.roles.cache.some(role => role.name === 'her')){ //checks if the auther has the she/her role
            royCoinEmbedReward.addFields(
                { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good girl`},
            )        
        }
        else{ //If the user has the they/them or dont have a gender role, it will always default to this
            royCoinEmbedReward.addFields(
                { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good child`},
            )            
        }

        message.author.send({ embeds: [royCoinEmbedReward] }); //sends the embed that was just created
        
        cooldowns.add(message.author.id); //Adds a cooldown to the id of the author
        setTimeout(() => {
            // Removes the user from the set after a while
            cooldowns.delete(message.author.id);
        }, 60 * 60000); //First number is minutes the second one times it because it is in milliseconds        

    }
}