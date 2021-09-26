const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "donate",
    description: "pings the server to see the delay between the client and the server",
    async execute(client, message, args, Discord){

        let mentionedUser = message.mentions.users.first().id;
        if (!mentionedUser) return message.channel.send('You need to mention a user.');

        console.log(mentionedUser)

        const senderResponse = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -1,
            }
        });
        
        profileDataMentioned = await profileModel.findOne({userID: message.mentionedUser});
        if(!profileDataMentioned) //Checks if the user has any data in the DB
        {
            let newUser = await profileModel.create({
                userID: message.mentionedUser,
                coins: 0,
            });
            //const savedUser = await newUser.save();
        }

        const reciverResponse = await profileModel.findOneAndUpdate({
            userID: message.mentionedUser,
        }, {
            $inc: {
                coins: 1,
            }
        });

        const royCoinDonate = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .addFields(
            { name: 'Roy Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentionedUser}> a Roy Coin?!?`}
        )
        .setFooter('Reddit Gold Replacement?');
        message.channel.send({ embeds: [royCoinDonate] });

    }
}