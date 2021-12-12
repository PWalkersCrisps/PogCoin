const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'profile',
    description: 'Gets the profile of the user',
    data: new SlashCommandBuilder().setName('profile')
    .setDescription('Who are you... or who are they?')
    .addUserOption(option => option.setName('target').setDescription('Whos profile do you want to see??')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {
        const userPinged = interaction.options.getMember('target');

        const userProfile = new MessageEmbed();

        if (!userPinged) {
            userProfile
            .addFields(
                { name: 'Pogcoin Stats', value: `Total Coins: ${profileData.totalCoinsEarnt}\nTotal Donated: ${profileData.coinsDonated}\nTotal Recieved: ${profileData.coinsReceived}` },
                { name: 'Gamble Stats', value: `Net Gambled: ${profileData.netGamble}` },
                { name: 'Rob Stats', value: `Successful Robberies: ${profileData.robSuccess}\nFailed Robberies: ${profileData.robFails}\nTimes Robbed: ${profileData.timesRobbed}` },
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
            .setTitle(interaction.user.username);
        }
        else if (userPinged) {
            const profileDataPinged = await profileSchema.findOne({ userID: userPinged.id }); // Attempts to look for a user in the DB with the user's id
            userProfile
            .addFields(
                { name: 'Pogcoin Stats', value: `Total Coins: ${profileDataPinged.totalCoinsEarnt}\nTotal Donated: ${profileDataPinged.coinsDonated}\nTotal Recieved: ${profileDataPinged.coinsReceived}` },
                { name: 'Gamble Stats', value: `Net Gambled: ${profileDataPinged.netGamble}` },
                { name: 'Rob Stats', value: `Successful Robberies: ${profileDataPinged.robSuccess}\nFailed Robberies: ${profileDataPinged.robFails}\nTimes Robbed: ${profileDataPinged.timesRobbed}` },
            )
            .setThumbnail(userPinged.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
            .setTitle(userPinged.username);
        }
        else if (userPinged.bot) {return interaction.reply('YOU IDIOT THAT WAS A BOT???');}

        interaction.reply({ embeds: [userProfile] });
    },
};