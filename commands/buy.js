const items = require("../economy/shopitems");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "buy",
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, args, message, profileModel, profileData){

        if(!args[0]) return message.channel.send("Actually try to buy something?")
        const itemToBuy = args[0].toLowerCase();

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.channel.send("Actually try to buy a real item??")

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        if(profileData.coins < itemPrice) return message.channel.send("Man... youre broke, get more more roycoins");


        const roleGive = items.find((val) => (val.item.toLowerCase()) === itemToBuy).roleid;

        message.member.roles.add(message.guild.roles.cache.find(r => r.id === roleGiveID));

        const royCoinDonate = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setFooter('Amazon Replacement?')
        .addFields(
            {name: "royshop", value: `wowza, moneybags <@${message.author.id}> just got <@&${message.guild.roles.cache.find(r => r.id === roleGiveID)}>`}
        )

        message.channel.send({ embeds: [royCoinDonate] })


    }
}