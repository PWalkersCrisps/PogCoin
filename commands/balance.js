const cooldowns = new Set();

module.exports = {
    name: "balance",
    description: "check your balance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        if (cooldowns.has(message.author.id)) { //checks if the author currently has a cooldown on this command
            message.channel.send(`Dont think pog is gonna be too happy with you spamming\n\nPlease can you wait like 30 or so seconds?`); 
        } else { //if the author doesnt have a cooldown then this code executes

            const userPinged = message.mentions.users.first();

            const pogCoinBalance = new MessageEmbed()
            .setColor('#ff00ff')
            .setTimestamp()
            .setFooter('Bitcoin Replacement?');

            if(userPinged === undefined){
                pogCoinBalance.addFields(
                    { name: 'pog Coin Bank', value: `You have ${profileData.coins} pogcoins`}
                )    
            }
            else{
                const profileDataPinged = profileData = await profileModel.findOne({userID: userPinged.id}); //Attempts to look for a user in the DB with the user's id

                pogCoinBalance.addFields(
                    { name: 'pog Coin Bank', value: `<@${userPinged.id}> has ${profileDataPinged.coins} <:pogcoin:899662337399750666>`}
                )    
            }

            message.channel.send({ embeds: [pogCoinBalance] });


            cooldowns.add(message.author.id); //adds a cooldown to the authors
            setTimeout(() => {
               // Removes the user from the set after a while
                cooldowns.delete(message.author.id);
            }, 30 * 1000);
        }
    }
}