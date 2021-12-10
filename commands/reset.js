const mongoose = require('mongoose');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'reset',
    description: 'resets a user\'s balance',
    data: new SlashCommandBuilder().setName('reset')
    .setDescription('Admin command lol')
    .addUserOption(option => option.setName('target').setDescription('Who do you want to reset?')),
    async execute(client, interaction, MessageEmbed, profileModel, profileData) {
        try {
            if (!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || !interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

            const response = await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                userID: interaction.options.getMember('target').id, // looks for the record of the message author's account
            }, {
                $set: {
                    coins: 1,
                    dailyTimestamp: 0,
                    robTimestamp: 0,
                    totalCoinsEarnt: 0,
                    coinsDonated: 0,
                    coinsReceived: 0,
                    netGamble: 0,
                    robSuccess: 0,
                    robFails: 0,
                    timesRobbed: 0,
                },
            });

            const resetPoints = new MessageEmbed() // Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Haha get deleted')
            .addFields(
                { name: 'Make fun of this person', value: `<@${interaction.options.getMember('target').id}> Just lost ALL of their coins and have been reset, make fun of them, like REALLY make fun of them` },
            );

            interaction.reply({ embeds: [resetPoints] });
        }
        catch (err) {
            console.error(err);
        }
    },
};