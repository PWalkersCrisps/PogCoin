const mongoose = require('mongoose');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'reset',
    description: 'resets a user\'s balance',
    data: new SlashCommandBuilder().setName('reset')
    .setDescription('Admin command lol')
    .addUserOption(option => option.setName('target').setDescription('Who do you want to reset?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, profileData) {
        if (!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || !interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

        const resetPoints = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Haha get deleted')
        .addFields(
            { name: 'Make fun of this person', value: `<@${interaction.options.getMember('target').id}> Just lost ALL of their coins and have been reset, make fun of them, like REALLY make fun of them` },
        );

        interaction.reply({ embeds: [resetPoints] });
    },
};