const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "about",
    description: "About the bot",
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('what da hell is this bot about?'),
    async execute(client, interaction, MessageEmbed, profileModel, profileData){
        try{
            const serverJoin = new MessageEmbed()
            .setColor("#ffff00")
            .setTitle("pogcoin")
            .setDescription("pogcoin has arrived into your uncapitalist society\n\nIt wont be uncapitalist, for any longer...")
            .setThumbnail("https://cdn.discordapp.com/attachments/839247233518272602/899631633722929192/paintcoin.gif")
            .setTimestamp()
            .setFooter("Is this the new Reddit gold replacement? is it???")
            .addFields(
                {name: "Why im here?", value: "Ive just dectected a lack of capitalism here, so i decided to start one and force every single one of you into it"},
                {name: "Cool, what do you do?", value: "You can get coins form me every hour, but heres a twist, you only have a chance of getting it"},
                {name: "What can i do with these coins?", value: "You can spend them ig... i mean, i havent started building my shop in this town yet, you gotta give me some time to build, im not like macdonalds where i can just place a builder like its sims city or something like that. But at the moment ig give it to people that you think deserve it"},
                {name: "Ok now wha...", value: "SHUT UP, youre questions are stupid"},
                {name: "your*", value: "SHUT UP SHUT UP SHUT UP SHUT UP SHUT UP SHUT UP"},
                {name: ".", value: "I woul very much appreciate it if you just didnt correct my mistakes, if you want to complain, go to PWalkersCrisps..."}
            )

            interaction.reply({ embeds: [serverJoin], ephemeral: true })
        }
        catch(err){
            console.error(err);
        }
    }
}
