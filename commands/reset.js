const mongoose = require('mongoose');
const { Permissions } = require('discord.js');

module.exports = {
    name: "reset",
    cooldown: 5,
    description: "resets a user's balance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || message.member.id == "426455031571677197") return message.channel.send(`<@${message.author.id}> actually have permissions to use the command next time`);
            if(!message.mentions.users.first()) return message.channel.send(`<@${message.author.id}> you idiot, you need to ping someone`)

            const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.mentions.users.first().id, //looks for the record of the message author's account
            }, {
                $set: {
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
                }
            });

            const resetPoints = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Haha get deleted')
            .addFields(
                {name: "Make fun of this person", value: `<@${message.mentions.users.first().id}> Just lost ALL of their coins and have been reset, make fun of them, like REALLY make fun of them`} //Its creates a time stamp for the message then compares it to when the message is actually sent to get a mostly accurate representation of the Client/Server delay
            );

            message.channel.send({ embeds: [resetPoints] }) 
        }
        catch(err){
            console.error(err);
        }
    }
}