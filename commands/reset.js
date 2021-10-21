const mongoose = require('mongoose');

module.exports = {
    name: "reset",
    description: "resets a user's balance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        if(!message.mentions.users.first()) return message.channel.send(`<@${message.author.id}> you idiot, you need to ping someone`)

        const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
            userID: message.mentions.users.first().id, //looks for the record of the message author's account
        }, {
            $set: {
                coins: 0, //decreases the amount of coins that the author has by the stated amount
            }
        });


    }
}