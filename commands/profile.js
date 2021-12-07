const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "profile",
    description: "Gets the profile of the user",
    data: new SlashCommandBuilder().setName('profile')
    .setDescription('Who are you... or who are they?')
    .addUserOption(option => option.setName('target').setDescription('Whos profile do you want to see??')),
    async execute(client, interaction, MessageEmbed, profileModel, profileData){
        try{
            userPinged = interaction.options.getMember('target');

            const userProfile = new MessageEmbed()

            if(userPinged === undefined){
                let profileData = await profileModel.findOne({userID: interaction.user.id}); //Attempts to look for a user in the DB with the user's id
                
                userProfile
                .addFields(
                    {name: `Pogcoin Stats`, value: `Total Coins: ${profileData.totalCoinsEarnt}\nTotal Donated: ${profileData.coinsDonated}\nTotal Recieved: ${profileData.coinsReceived}`},
                    {name: `Gamble Stats`, value: `Net Gambled: ${profileData.netGamble}`},
                    {name: `Rob Stats`, value: `Successful Robberies: ${profileData.robSuccess}\nFailed Robberies: ${profileData.robFails}\nTimes Robbed: ${profileData.timesRobbed}`},
                )
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true , size: 2048 , format: "png" }))
                .setTitle(interaction.user.username)
            }
            else if (userPinged){
                let profileDataPinged = await profileModel.findOne({userID: userPinged.id}); //Attempts to look for a user in the DB with the user's id
                if(!profileDataPinged) //If there was no profile data of the mentioned user then it will create a new account on the database
                {
                    let newUser = await profileModel.create({
                        userID: interaction.user.id,
                        coins: 10,
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
                    //const savedUser = await newUser.save();
                }
                userProfile
                .addFields(
                    {name: `Pogcoin Stats`, value: `Total Coins: ${profileDataPinged.totalCoinsEarnt}\nTotal Donated: ${profileDataPinged.coinsDonated}\nTotal Recieved: ${profileDataPinged.coinsReceived}`},
                    {name: `Gamble Stats`, value: `Net Gambled: ${profileDataPinged.netGamble}`},
                    {name: `Rob Stats`, value: `Successful Robberies: ${profileDataPinged.robSuccess}\nFailed Robberies: ${profileDataPinged.robFails}\nTimes Robbed: ${profileDataPinged.timesRobbed}`},
                )
                .setThumbnail(userPinged.displayAvatarURL({ dynamic: true , size: 2048 , format: "png" }))                
                .setTitle(userPinged.username)
            }
            else if (userPinged.bot) return interaction.reply("YOU IDIOT THAT WAS A BOT???")


            const profileData = await profileModel.findOne({userID: interaction.user.id}); //Attempts to look for a user in the DB with the user's id


            interaction.reply({ embeds: [userProfile] }); 
        }
        catch(err){
            console.log(err);
        }
    }
}