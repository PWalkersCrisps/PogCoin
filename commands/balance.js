const cooldowns = new Set();

module.exports = {
    name: "balance",
    description: "check your balance",
    async execute(client, message, args, Discord, profileData, MessageEmbed){
        if (cooldowns.has(message.author.id)) {
            message.channel.send(`Dont think Roy is gonna be too happy with you spamming\n\nPlease can you wait like 1 minute?`); 
        } else {

            const royCoinBalance = new MessageEmbed()
            .setColor('#ff00ff')
            .setTimestamp()
            .addFields(
                { name: 'Roy Coin Bank', value: `You have ${profileData.coins}<:RoyCoin:891377698922958879>`}
            )
            .setFooter('Reddit Gold Replacement?');
            message.channel.send({ embeds: [royCoinBalance] });


            cooldowns.add(message.author.id);
            setTimeout(() => {
               // Removes the user from the set after a while
                cooldowns.delete(message.author.id);
            }, 60 * 1000);
        }
    }
}