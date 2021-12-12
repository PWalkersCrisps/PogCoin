const items = require('../arrays/shopitems');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'buy',
    description: 'Buy from the bot',
    data: new SlashCommandBuilder().setName('buy')
    .setDescription('Buys an item from the shops')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),

    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {

        profileData = await profileSchema.findOne({ userID: interaction.user.id }); // Attempts to look for a user in the DB with the user's id

        const itemToBuy = interaction.options.getString('input');

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if (!validItem) return interaction.reply('Actually try to buy a real item??');

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

        if (profileData.coins < itemPrice) return interaction.reply('Man... youre broke, get more more pogcoins');

        const response = await profileSchema.findOneAndUpdate({ // finds the profile of the author then updates it
            userID: interaction.user.id, // looks for the record of the message author's account
        }, {
            $inc: {
                coins: -itemPrice, // decreases the amount of coins that the author has by the stated amount
            },
        });

        const roleGive = items.find((val) => (val.item.toLowerCase()) === itemToBuy).roleid;

        interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.id === roleGive));

        const pogCoinBuy = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setFooter('Amazon Replacement?')
        .addFields(
            { name: 'pogshop', value: `wowza, moneybags <@${interaction.user.id}> just got ${interaction.guild.roles.cache.find(r => r.id === roleGive)}` },
        );

        interaction.reply({ embeds: [pogCoinBuy] });


    },
};