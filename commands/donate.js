const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'donate',
    description: 'Donate a coin to someone',
    data: new SlashCommandBuilder().setName('donate')
    .setDescription('Gibvs someone money')
    .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {

        const userMentioned = interaction.options.getMember('target');

        if (interaction.user.id === userMentioned.id) return interaction.reply({ content: 'You cant donate to yourself...', ephemeral: true });
        const amount = interaction.options.getInteger('int') || 1;

        const profileDataSender = await profileSchema.findOne({ userID: interaction.user.id }); // Gets the profile data of the sender
        if (profileDataSender.coins < amount) return interaction.reply({ content: `<@${interaction.user.id}> Bruh, are you actually this broke? Try giving people coins when you actually have some pogcoins <:nioCyoR:891377626831290509> <:staremock:821120707035267133>`, ephemeral: true }); // Using the profile data from earlier, the bot makes a check if the user actually has any coins, if not the rest of the script wont execute, and then the bot mocks them
        else if (amount < 1) return interaction.reply({ content: `<@${interaction.user.id}> Actually say a valid number???`, ephemeral: true });

        const senderResponse = await profileSchema.findOneAndUpdate({ // finds the profile of the author then updates it
            userID: interaction.user.id, // looks for the record of the message author's account
        }, {
            $inc: {
                coins: -amount, // decreases the amount of coins that the author has by the stated amount
                coinsDonated: amount,
            },
        });

        const profileDataMentioned = await profileSchema.findOne({ userID: interaction.options.getUser('target').id }); // Gets the profile data of the user mentioned
        if (!profileDataMentioned) { // If there was no profile data of the mentioned user then it will create a new account on the database
            const newUser = await profileSchema.create({
                userID: interaction.options.getUser('target').id,
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

            });
            // const savedUser = await newUser.save();
        }

        const reciverResponse = await profileSchema.findOneAndUpdate({ // finds the profile of the user that the author mentioned then updates it
            userID: interaction.options.getUser('target').id,
        }, {
            $inc: {
                coins: amount, // increases the amount of coins that the mentioned has by 1
                coinsReceived: amount,
                totalCoinsEarnt: amount,
            },
        });

        const pogCoinDonate = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');

        if (amount == 1) {
            pogCoinDonate.addFields(
                { name: 'pog Coin Charity', value: `<@${interaction.user.id}> just gave <@${interaction.options.getUser('target').id}> a pogcoin?!?` },
            );
        }
        else {
            pogCoinDonate.addFields(
                { name: 'pog Coin Charity', value: `<@${interaction.user.id}> just gave <@${interaction.options.getUser('target').id}>  ${amount} pogcoins?!?` },
            );
        }

        interaction.reply({ embeds: [pogCoinDonate] });
    },
};