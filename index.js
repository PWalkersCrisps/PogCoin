const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const fs = require("fs");
const mongoose = require("mongoose");
const profileModel = require("./models/profileSchema.js");
const { MessageEmbed } = require('discord.js');

require("dotenv").config();

const cooldowns = new Set();

const prefix = ">";

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => { //when the client is 'ready' then it will execute everything below
    console.log(`${client.user.tag} is online, hopefully it works`);
});

///-----Mongoose-----///

mongoose.connect(process.env.MONGODB_SRV, { //idk what this shit does
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`Connected to the MongoDB database`)
}).catch((err)=>{
    console.log(err);
});

client.on("messageCreate", async (message) =>{ //whenever a message is created then everything here will be active

    if(message.author.bot) return;

    ///-----Mongoose-----///

    let profileData;
    try{

        profileData = await profileModel.findOne({userID: message.author.id});
        if(!profileData)
        {
            let newUser = await profileModel.create({
                userID: message.author.id,
                coins: 0,
            });
            //const savedUser = await newUser.save();
        }
    }
    catch(err){
        console.log(err) //if mongoose had a problem trying to create a new user, then it will log it in the console rather then crashing
    }

    let randomCoinChance = Math.floor(Math.random() * 5)+1 //makes up a random number when a message is created
    console.log(randomCoinChance)
    if (randomCoinChance === 1){ //if the random number is equal to 7 then iy will start the proccess of giving a roy coin
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id, //it looks for the id of the author
        }, {
            $inc: {
                coins: 1, //when the id of the author is found, it gives them one coin
            }
        });

        const exampleEmbed = new MessageEmbed()
        .setColor('#ffff00')
        .addFields(
            { name: 'Roy Coin', value: 'Youve been rewarded with a Roy Coin for being a good boy' },
        )
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');
        ;
        channel.send({ embeds: [exampleEmbed] });
    }


    if(!message.content.startsWith(prefix)) return; //if the message didnt start with the bot's prefix, it just goes back to the start
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //this turns the command into lowercase so i dont have to account for complexities like capitilisation

    switch(command){ //This switch case will cycle trhough all of the cases here to get to something that is true
        case "ping":
            client.commands.get('ping').execute(client, message, args, Discord);
            break;
    }
})

client.login(process.env.DISCORD_TOKEN); //this is the token of the bot