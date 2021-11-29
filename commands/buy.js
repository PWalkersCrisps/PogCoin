const items = require("../arrays/shopitems");
const { MessageEmbed } = require("discord.js");
const profileModel = require("../models/profileSchema.js");


module.exports = {
    name: "buy",
    description: "Buy from the bot",
    cooldown: 5,
    async execute(Discord, client, args, message){
        try{
            if(message.channel.id === "903398509171060749") return message.channel.send(`Please use this in <#899055241104879616> or else this chat will be spammed`);
            profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id

            if(!args[0]) return message.channel.send("Actually try to buy something?")
            const itemToBuy = args[0].toLowerCase();

            const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
            if(!validItem) return message.channel.send("Actually try to buy a real item??")

            const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

            if(profileData.coins < itemPrice) return message.channel.send("Man... youre broke, get more more pogcoins");

            const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.author.id, //looks for the record of the message author's account
            }, {
                $inc: {
                    coins: -itemPrice, //decreases the amount of coins that the author has by the stated amount
                }
            });

            const roleGive = items.find((val) => (val.item.toLowerCase()) === itemToBuy).roleid;

            message.member.roles.add(message.guild.roles.cache.find(r => r.id === roleGive));

            const pogCoinBuy = new MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setFooter('Amazon Replacement?')
            .addFields(
                {name: "pogshop", value: `wowza, moneybags <@${message.author.id}> just got ${message.guild.roles.cache.find(r => r.id === roleGive)}`}
            )

            message.author.send({ embeds: [pogCoinBuy] });
        }
        catch(err){
            console.error(err);
        }

    }
}