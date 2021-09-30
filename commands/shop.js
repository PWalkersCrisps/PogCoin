const items = require("../economy/shopitems")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "shop",
    async execute(Discord, client, args, message, profileModel, profileData){

        if (items.length === 0) return message.channel.send(`<@${message.author.id}> Unfortunatly im not selling right now, ig you just need to be patient`);

        const shoplist = items.map((value, index) =>{
            return `**${index + 1}** ${value.item} -> ${value.price} coins!`
        });

        message.channel.send(shoplist);

    }
}