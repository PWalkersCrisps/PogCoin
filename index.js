const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const mongoose = require("mongoose");

require("dotenv").config();

///-----Command/Event Handlers-----///

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

try{
    ['event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord)
    })
}
catch(err){
    console.log(err);
}

///-----Mongoose-----///
mongoose.connect(process.env.MONGODB_SRV, { //idk what this shit does
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to the MongoDB database`)
}).catch((err) => {
    console.log(err);
});


///-----Login-----///
client.login(process.env.DISCORD_TOKEN); //this is the token of the bot

