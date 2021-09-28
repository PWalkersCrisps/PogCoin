const cooldowns = new Set();

module.exports = {
    name: "balance",
    description: "check your balance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        if (cooldowns.has(message.author.id)) { //checks if the author currently has a cooldown on this command
            message.channel.send(`Dont think Roy is gonna be too happy with you spamming\n\nPlease can you wait like 1 minute?`); 
        } else { //if the author doesnt have a cooldown then this code executes

            const royCoinBalance = new MessageEmbed()
            .setColor('#ff00ff')
            .setTimestamp()
            .addFields(
                { name: 'Roy Coin Bank', value: `You have ${profileData.coins}<:RoyCoin:891377698922958879>`}
            )
            .setFooter('Reddit Gold Replacement?');
            message.channel.send({ embeds: [royCoinBalance] });


            cooldowns.add(message.author.id); //adds a cooldown to the authors
            setTimeout(() => {
               // Removes the user from the set after a while
                cooldowns.delete(message.author.id);
            }, 60 * 1000);
        }
    }
}