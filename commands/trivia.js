const triviaList = require("../triviaQuestions");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "trivia",
    description: "",
    async execute(Discord, client, args, message, profileModel, profileData){

        let triviaQuestions = triviaList[Math.floor(Math.random()*triviaList.length)];

        const triviaEmbed = new MessageEmbed()
        .setTitle(triviaQuestions.title)
        .setDescription(triviaQuestions.options.map(opt => {
            i++;
            return `${i} - ${opt}\n`
        }))
        .setTimestamp()
        .setColor("#b00b15")
        try{
            
        }
        catch (err){
            return message.channel.send(`I didnt get any correct answers...\nBetter luck next time`)
        }


    }
}