module.exports = {
    name: "gamble",
    description: "gamble your life savings away",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if(message.channel.id === "816008277619638332") return message.channel.send(`Please use this in <#899055241104879616> or else this chat will be spammed`);
            const amount = args[0];
            if (amount < 1) return message.channel.send(`<${message.author.id}> Please can you actually try to gamble something?`)
            if(profileData.coins < amount) return message.channel.send("Actually have enough coins??")


            let pogCoinGamble = new MessageEmbed() //Starts the proccess for creating an embed
            .setTimestamp()
            
            let probability;
            if (amount => 70) probability = 0.2
            else probability = (( -amount + 100) / 2) / 75

            if(Math.random() < probability){
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: amount, //when the id of the author is found, it gives them one coin
                        totalCoinsEarnt: amount * 2,
                        netGamble: amount,
                    }
                });
                pogCoinGamble
                .setFooter('Holy shit you actually won?')
                .setColor('YELLOW')
                .addFields(
                    {name: `!!!YOU WON!!!`, value: `<@${message.author.id}> HOLY FUCKING SHIT YOU ACTUALLY WON? I PROBABLY SHOULD GIVE YOU ${amount * 2} <:pogcoin:899662337399750666>`}
                )
            }
            else{
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: -amount, //when the id of the author is found, it gives them one coin
                        netGamble: -amount,
                    }
                });
                pogCoinGamble
                .setFooter('Vegas Replacement?')
                .setColor('RED')
                .addFields(
                    {name: `YOU LOST!`, value: `<@${message.author.id}> omg you actually lost ${amount} <:pogcoin:899662337399750666>, i really want to make fun of you`}
                )
            }

            message.channel.send({ embeds: [pogCoinGamble] });
        }
        catch(err){
            console.error(err);
        }
    }
}