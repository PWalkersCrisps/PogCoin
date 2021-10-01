const items = require("../economy/shopitems");
const { MessageEmbed } = require("discord.js");
const profileModel = require("../models/profileSchema.js");

module.exports = {
    name: "buy",
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, args, message, profileData){

        if(!args[0]) return message.channel.send("Actually try to buy something?")
        const itemToBuy = args[0].toLowerCase();

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.channel.send("Actually try to buy a real item??")

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        if(profileData.coins < itemPrice) return message.channel.send("Man... youre broke, get more more roycoins");

        const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
            userID: message.author.id, //looks for the record of the message author's account
        }, {
            $inc: {
                coins: -itemPrice, //decreases the amount of coins that the author has by the stated amount
            }
        });

        const roleGive = items.find((val) => (val.item.toLowerCase()) === itemToBuy).roleid;

        message.member.roles.add(message.guild.roles.cache.find(r => r.id === roleGive));

        const royCoinDonate = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setFooter('Amazon Replacement?')
        .addFields(
            {name: "royshop", value: `wowza, moneybags <@${message.author.id}> just got ${message.guild.roles.cache.find(r => r.id === roleGive)}`}
        )

        message.channel.send({ embeds: [royCoinDonate] })


    }
}