const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "give",
    description: "give a player some coins",
    async execute(client, message, args, Discord, profileData) {

        if (!args.length){
            message.channel.send("You need to mention a member to give them coins");
            return;
        }
        const amount = args[1];
        if (!message.mentions.users.first()) return message.channel.send("That user does not exist");

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Ayo if you want to actually give money make it an actual number");

        try {
        const targetData = await profileModel.findOne({ userID: message.mentions.users.first().id });
        if (!targetData) 

        const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
            userID: message.mentions.users.first().id, //looks for the record of the message author's account
        }, {
            $inc: {
                coins: amount, //decreases the amount of coins that the author has by the stated amount
            }
        });

        return message.channel.send(`<@${message.mentions.users.first().id}> has just been given ${amount} coins\n\nmake fun of them ig?`);
        } catch (err) {
        console.log(err);
        }
    },
};
