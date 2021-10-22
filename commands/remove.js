
const mongoose = require('mongoose');

module.exports = {
    name: "remove",
    description: "give a player some coins",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData) {

        if (!args.length){
            message.channel.send("You need to mention a member to steal them coins");
            return;
        }
        const amount = args[1];
        if (!message.mentions.users.first()) return message.channel.send("That user does not exist");

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Ayo if you want to actually take money make it an actual number");

        try {
        const targetData = await profileModel.findOne({ userID: message.mentions.users.first().id });
        if (!targetData)
        {
            let newUser = await profileModel.create({
                userID: message.mentions.users.first().id,
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

        const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
            userID: message.mentions.users.first().id, //looks for the record of the message author's account
        }, {
            $inc: {
                coins: -amount, //decreases the amount of coins that the author has by the stated amount
            }
        });

        return message.channel.send(`<@${message.mentions.users.first().id}> has just lost ${amount} coins\n\nmake fun of them!! :emock:`);
        } catch (err) {
        console.log(err);
        }
    },
};
