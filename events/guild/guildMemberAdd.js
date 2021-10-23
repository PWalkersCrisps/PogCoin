module.exports = (Discord, client, newMember) =>{

    const { MessageEmbed } = require('discord.js'); 

    try{
        const memberJoinEmbed = new MessageEmbed()
        .setColor("#696969")
        .setTitle(`Welcome to discord.gg/pog`)
        .setDescription(`Hi, we appreciate you being on this server and we would like it if you were to stay here, we've got a multitude of dumb shit you could do for example...
        -Talk to idiots <#816008277619638332>
        -Ping a random person <#873826513932386304>
        -Play around with me, pogcoin`)
        .addFields(
            {name: `What are you?`, value: `I'm pogcoin, essentially i am the server's social credit system, the more coins that you have the more swag you are, honestly, im just 'cosmentic' but it is still pretty cool.`},
            {name: "Social credit? Isnt that a bit like China?", value: "Nononono, we aren't a 'dictatorship', we actually allow opinions on high ranking people, for example you could shit on PWalkersCrisps all you want and he won't ban you, he will just cry behind that monitor"}
        )
        .setAuthor("Pogcoin - created by PWC")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/839247233518272602/899631633722929192/paintcoin.gif")
    
        newMember.send({ embeds: [memberJoinEmbed] }) 
    }
    catch(err){
        console.log(err);
    }
};