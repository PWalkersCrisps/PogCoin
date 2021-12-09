const items = require('../arrays/shopitems');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'shop',
    data: new SlashCommandBuilder().setName('shop')
    .setDescription('view what you want to buy'),
    async execute(client, interaction, MessageEmbed, profileModel, profileData) {
        try {
            if (items.length === 0) return inte(`<@${interaction.user.id}> Unfortunatly im not selling right now, ig you just need to be patient`);

            const shoplistEmbed = new MessageEmbed()
            .setColor('#7de48b')
            .setTimestamp()
            .setFooter('Steam Shop Replacement?')
            .setTitle('pog Shop')
            .setDescription(`Use ${process.env.DISCORD_PREFIX}buy to buy a role`);

            const itemlist = items.map((value, index) => {
                return shoplistEmbed.addFields(
                    { name: `**${index + 1})** ${value.item}`, value: `${value.price} pogcoins!` },
                );
            });

            interaction.reply({ embeds: [shoplistEmbed], ephemeral: true });
        }
        catch (err) {
            console.error(err);
        }
    },
};