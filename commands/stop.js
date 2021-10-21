module.exports = {
    name: "stop",
    description: "shuts down bot",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        const restartEmbed = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#afa00a')
        .setTimestamp()
        .setFooter('Some kind of replacement for something?')
        .addFields(
            {name: "Are you sure you want to shut down", value: "React with ✅ to continue shutting down \nReact with ❌ to stop shutting down\n\n**WARNING: THIS WILL STOP AND ONLY PWC CAN START IT UP AGAIN**"}
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
                message.channel.send('Stopping...')
                .then(message => client.destroy())
            } 
            else if (reaction.emoji.name === '❌') {
                message.channel.send("Whatever suits you...")
            }
        })
    }
}