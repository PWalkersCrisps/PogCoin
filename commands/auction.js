const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'auction',
    description: 'Sell someone else',
    data: new SlashCommandBuilder()
    .setName('auction')
    .setDescription('Only whooshie can use this')
    .addStringOption(option => option.setName('input').setDescription('Enter [start/end]'))
    .addUserOption(option => option.setName('target').setDescription('Who is being sold / Who brought this?'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much?')),

    async execute(client, interaction, MessageEmbed, profileModel, profileData) {

        try {

            const currentAuctioneerID = [
                '790793241665863710',
                '426455031571677197',
            ];

            if (!currentAuctioneerID.includes(interaction.user.id)) return interaction.reply({ content: 'Sorry, only someone with auction perms can use this', ephemeral: true });

            const auctionMode = interaction.options.getString('input');
            const userPinged = interaction.options.getUser('target');
            const amount = interaction.options.getInteger('int');

            const pogCoinAuction = new MessageEmbed()
            .setTitle('Time to do some little selling');


            switch (auctionMode) {
                case 'start':
                    pogCoinAuction
                    .setDescription(`<@${interaction.user.id}> is now selling someone, please be sensible because your coins will actually be taken away.`)
                    .addFields(
                        {
                            name: 'Auctions',
                            value: `<@${userPinged.id}> is being sold with the inital starting bid of ${amount} pogcoins`,
                        },
                    )
                    .setThumbnail(userPinged.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }));


                    break;
                case 'end':
                    // eslint-disable-next-line no-case-declarations
                    const profileDataMentioned = await profileModel.findOne({ userID: userPinged.id }); // Gets the profile data of the user mentioned
                    if (!profileDataMentioned) { // If there was no profile data of the mentioned user then it will create a new account on the database
                        await profileModel.create({
                            userID: interaction.options.getMember('target').id,
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

                    if (profileDataMentioned.coins < amount) { return interaction.reply(`<@${message.author.id}> dont you realise... <@${userPinged.id}> is actually broke. chose the second highest bidder ig`); }

                    await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                        userID: userPinged.id, // looks for the record of the message author's account
                    }, {
                        $inc: {
                            coins: -amount, // decreases the amount of coins that the author has by the stated amount
                        },
                    });

                    await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                        userID: message.author.id, // looks for the record of the message author's account
                    }, {
                        $inc: {
                            coins: amount, // decreases the amount of coins that the author has by the stated amount
                        },
                    });

                    pogCoinAuction
                    .setDescription(`<@${userPinged.id}> just won the auction with ${amount} pogcoins`);


                    break;

            }

            interaction.reply({ embeds: [pogCoinAuction] });


        }
        catch (err) {
            console.error(err);
        }

    },
};