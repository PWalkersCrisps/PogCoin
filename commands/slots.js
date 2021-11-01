const randomInsult = require("../arrays/randomInsult");

module.exports = {
    name: "slots",
    description: "Gamble your life savings away",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if(message.channel.id === "816008277619638332") return message.channel.send(`Please use this in <#899055241104879616> or else this chat will be spammed`);
            const outcomeEmotes = [
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
                "<:pixel_despair:902537185713082388>", //lose 2x the bet
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

            const amount = args[0];
            if(!amount || amount < 1) return message.channel.send("Actually try to bet smthing?")
            if(profileData.coins < amount) return message.channel.send("Actually have enough coins??")

            function getRandomEmote(){
                return outcomeEmotes[Math.floor(Math.random() * outcomeEmotes.length)];
            }

            async function gambleWinnings(multiplier){
                try{
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
                catch(err){
                    console.error(err)
                }
            }

            let outcome1 = getRandomEmote();
            let outcome2 = getRandomEmote();
            let outcome3 = getRandomEmote();

            if (Math.random() < 0.55) outcome2 = outcome1;
            if (Math.random() < 0.55) outcome3 = outcome2;

            const pogCoinSlots = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#aec234')
            .setTimestamp()
            .setFooter("Middle line only counts idiot")
            .addFields(
                {name: `Poggers slot machine`, value: `${getRandomEmote()} ${getRandomEmote()} ${getRandomEmote()}\n${outcome1} ${outcome2} ${outcome3}\n${getRandomEmote()} ${getRandomEmote()} ${getRandomEmote()}`}
            )
            const pogCoinWinnings = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#f924e5')
            .setTimestamp()
            .setFooter("How it works here is that you either pay us or we pay you")


            if (outcome1 == outcome2 && outcome2 == outcome3){
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
                        pogCoinWinnings.addFields(
                            {name: `Your winnings`, value: `**Wowza**, to think that you won, this is sincreasingly getting more poggers`},
                        )
                        break;
                    case "<:pixel_pogcoin:902537185637584926>":
                        gambleWinnings(3);
                        pogCoinSlots.setFooter("Holy shit you actually won?")
                        pogCoinWinnings.addFields(
                            {name: `Your winnings`, value: `***HOLY FUCKING SHIT YOU GOT 4x OF YOUR ORIGINAL BET`},
                        )
                        break;
                }

                console.log("Slots Win")
                

            }
            else {
                gambleWinnings(-1);
                pogCoinWinnings.addFields(
                    {name: `Your winnings`, value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}`},
                )
            }

            message.channel.send({ embeds: [pogCoinSlots, pogCoinWinnings] });

        }
        catch(err){
            console.error(err)
        }
    }
}