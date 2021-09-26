const profileModel = require("../models/profileScema");

module.exports = {
    name: "donate",
    description: "pings the server to see the delay between the client and the server",
    async execute(client, message, args, Discord, MessageEmbed){

        let mentionedUser = message.mentions.users.first();
        if (!mentionedUser) return message.channel.send('You need to mention a user.');

        const senderResponse = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -1,
            }
        });
        
        profileDataMentioned = await profileModel.findOne({userID: message.mentionedUser.id});
        if(!profileDataMentioned) //Checks if the user has any data in the DB
        {
            let newUser = await profileModel.create({
                userID: message.mentionedUser.id,
                coins: 0,
            });
            //const savedUser = await newUser.save();
        }

        const reciverResponse = await profileModel.findOneAndUpdate({
            userID: message.mentionedUser.id,
        }, {
            $inc: {
                coins: 1,
            }
        });

    }
}