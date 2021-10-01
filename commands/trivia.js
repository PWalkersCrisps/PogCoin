const triviaList = require("../triviaQuestions");

module.exports = {
    name: "trivia",
    description: "",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        const triviaQuestions = triviaList.map((value, index) =>{
            let randomTrivia = Math.floor(Math.random() * 4)+1
            console.log(triviaList.get(randomTrivia));
        });


    }
}