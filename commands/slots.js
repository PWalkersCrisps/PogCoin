const randomInsult = require("../arrays/randomInsult");

module.exports = {
    name: "slots",
    description: "Gamble your life savings away",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            const outcomeEmotes = [
                "<:pixel_despair:90253718571308238  8>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_bruh:902537185444642847>", //Nothing + insult
                "<:pixel_bruh:902537185444642847>", //Nothing + insult
                "<:pixel_bruh:902537185444642847>", //Nothing + insult
                "<:pixel_bruh:902537185444642847>", //Nothing + insult
                "<:pixel_7:902537185713074207>", //2x
                "<:pixel_7:902537185713074207>", //2x
                "<:pixel_7:902537185713074207>", //2x
                "<:pixel_pepeBusiness:902537185364938825>", //3x
                "<:pixel_pepeBusiness:902537185364938825>", //3x
                "<:pixel_pogcoin:902537185637584926>", //4x
            ];

            const amount = args[0]

            function getRandomEmote(){
                return Math.floor(Math.random() * outcomeEmotes.length);
            }

            async function gambleWinnings(multiplier){
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: amount * multiplier, //when the id of the author is found, it gives them one coin
                        netGamble: amount * multiplier,
                        totalCoinsEarnt: amount * multiplier,
                    }
                });
            }

            let outcome1 = getRandomEmote();
            let outcome2 = getRandomEmote();
            let outcome3 = getRandomEmote();

            if (Math.random() < 0.4) outcome2 = outcome1;
            if (Math.random() < 0.6) outcome3 = outcome2;

            const pogCoinSlots = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#aec234')
            .setTimestamp()
            .setFooter("Middle line only counts idiot")
            .addFields(
                {name: `Poggers slot machine`, value: `${getRandomEmote()}${getRandomEmote()}${getRandomEmote()}\n${outcome1}${outcome2}${outcome3}\n${getRandomEmote()}${getRandomEmote()}${getRandomEmote()}`}
            )
            const pogCoinWinnings = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#f924e5')
            .setTimestamp()
            .setFooter("How it works here is that you either pay us or we pay you")


            if (outcome1 == outcome2 == outcome3){
                switch (outcome1){
                    case "<:pixel_despair:902537185713082388>":
                        gambleWinnings(-2);
                        pogCoinWinnings.addFields(
                            {name: `Your winnings`, value: `Damn you lost, **HARD**.\n\nNow pay up, you owe us ${amount * -2}`},
                        )            
                        break;
                    case "<:pixel_bruh:902537185444642847>":
                        gambleWinnings(-1);
                        pogCoinSlots.addFields(
                            {name: `lo insulta`, value: `${randomInsult[Math.floor(Math.random() * randomInsult.length)]}`}
                        )
                        pogCoinWinnings.addFields(
                            {name: `Your winnings`, value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}`},
                        )
                        break;
                    case "<:pixel_7:902537185713074207>":
                        gambleWinnings(1);
                        pogCoinSlots.setFooter("Holy shit you actually won?")
                        pogCoinWinnings.addFields(
                            {name: `Your winnings`, value: `**Wowza**, to think that you won, thats amazing`},
                        )
                        break;
                    case "<:pixel_pepeBusiness:902537185364938825>":
                        gambleWinnings(2);
                        pogCoinSlots.setFooter("Holy shit you actually won?")
                        break;
                    case "<:pixel_pogcoin:902537185637584926>":
                        gambleWinnings(3);
                        pogCoinSlots.setFooter("Holy shit you actually won?")
                        break;
                }

                message.channel.send({ embeds: [pogCoinSlots] });
                message.channel.send({ embeds: [pogCoinWinnings] });

            }

        }
        catch(err){
            console.log(err)
        }
    }
}