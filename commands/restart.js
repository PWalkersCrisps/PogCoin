module.exports = {
    name: "restart",
    description: "restarts the bot",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        const restartEmbed = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#afa00a')
        .setTimestamp()
        .setFooter('Some kind of replacement for something?')
        .addFields(
            {name: "Are you sure you want to restart", value: "React with ✅ to continue restarting \nReact with ❌ to stop restarting\n\n**WARNING: THIS WILL RESTART THE CURRENT LIST OF COOLDOWNS**"}
        );

        message.channel.send({ embeds: [restartEmbed] }) 
        .then(msg=> { msg.react("✅") })
        .then(msg=> { msg.react("❌") })
        .catch();

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.user.id;
        };

        message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
                message.channel.send('Resetting...')
                .then(message => client.destroy())
                .then(() => client.login(process.env.DISCORD_TOKEN));
            } 
            else if (reaction.emoji.name === '❌') {
                message.channel.send("Whatever suits you...")
            }
        })
    }
}