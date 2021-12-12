const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'remove',
    description: 'give a player some coins',
    data: new SlashCommandBuilder().setName('remove')
    .setDescription('Admin command lol')
    .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to remove?')),

    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {

        if (!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || !interaction.user.id == '426455031571677197') return interaction.reply(`<@${interaction.user.id}> actually have permissions to use the command next time`);
        const amount = interaction.options.getInteger('int');

        const response = await profileSchema.findOneAndUpdate({ // finds the profile of the author then updates it
            userID: interaction.options.getMember('target').id, // looks for the record of the message author's account
        }, {
            $inc: {
                coins: -amount, // decreases the amount of coins that the author has by the stated amount
            },
        });

        return interaction.reply(`<@${interaction.options.getMember('target').id}> has just lost ${amount} coins\n\nmake fun of them!! :emock:`);

    },
};
