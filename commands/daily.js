const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'daily',
    description: 'get coins daily at a chance',
    data: new SlashCommandBuilder().setName('daily')
    .setDescription('Get your daily coin, but beware, there is a 50% chance of getting nothing!'),

    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {

        if (parseFloat(profileData.dailyTimestamp) + 86400 <= Date.now() / 1000) {

            const pogCoinDaily = new MessageEmbed()
            .setColor('#ab5612')
            .setTimestamp()
            .setFooter('Wages in america replacement?');

            if (Math.random() < 0.5) {
                await profileSchema.findOneAndUpdate({
                    userID: interaction.user.id,
                }, {
                    $inc: {
                        coins: 1,
                    },

                });
                pogCoinDaily.addFields(
                    {
                        name: 'Daily coins',
                        value: `<@${interaction.user.id}> you gained a coin have a nice time`,
                    },
                );


            }
            else {
                pogCoinDaily.addFields(
                    {
                        name: 'Daily coins',
                        value: `<@${interaction.user.id}> nah, lol. no coin for you`,
                    },
                );
            }

            await cooldownSchema.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $set: {
                    dailyTimestamp: Date.now() / 1000,
                },

            });


            interaction.reply({ embeds: [pogCoinDaily] });

        }
        else {
            interaction.reply({ content: `<@${interaction.user.id}> you are still on cooldown, you just need to wait ${parseFloat(profileData.dailyTimestamp) + 86400 - Date.now() / 1000} seconds\n\n\n do the math yourself, NERD!!` });
        }
    },
};