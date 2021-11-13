const talkedRecently = new Set();

module.exports = {
    name: "ariBirthday",
    description: "get coins daily at a chance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        if (!talkedRecently.has(message.author.id)) {
            if(message.author.id === "632520343839309825") return message.channel.send(`You aint ari`);


            let pogCoinDaily = new MessageEmbed()
            .setColor('#ffffff')
            .setTimestamp()
            .setTitle(`HAPPY BIRTHDAY!!!`)
            .setDescription(`as a birthday present.....\n\n\n\n YOU GET 10 POGCOINS!!!!!`)
            .setFooter('amazing!');


            const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.author.id, //looks for the record of the message author's account
            }, {
                $inc: {
                    coins: 10,            
                }

            });
            
            message.channel.send({ embeds: [pogCoinDaily] })
            
        }
    }
}