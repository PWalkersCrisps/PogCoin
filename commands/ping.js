const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'ping',
    description: 'pings the server to see the delay between the client and the server',
    data: new SlashCommandBuilder().setName('ping')
    .setDescription('Replies with server latinency'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileModel, profileData) {

        const pogCoinPing = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?')
        .addFields(
            { name: 'Ping Pong', value: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.` }, // Its creates a time stamp for the message then compares it to when the message is actually sent to get a mostly accurate representation of the Client/Server delay
        );

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
        );

        interaction.reply({ embeds: [pogCoinPing], components: [row] });
    },
};