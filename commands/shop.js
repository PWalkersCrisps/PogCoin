const items = require("../economy/shopitems")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "shop",
    async execute(Discord, client, args, message, profileModel, profileData){

        if (items.length === 0) return message.channel.send(`<@${message.author.id}> Unfortunatly im not selling right now, ig you just need to be patient`);

        const shoplistEmbed = new MessageEmbed()
        .setColor("#7de48b")
        .setTimestamp()
        .setFooter("Steam Shop Replacement?")
        .setTitle("Roy Shop")
        .setDescription(`Use ${process.env.DISCORD_PREFIX}buy to buy a role`)

        const itemlist = items.map((value, index) =>{
            `**${index + 1})** ${value.item} -> ${value.price} coins!`
            return shoplistEmbed.addFields(
                {name: `**${index + 1})** ${value.item}`, value: `${value.price} roycoins!`}
            )
        });

        message.channel.send({ embeds: [shoplistEmbed] })

    }
}