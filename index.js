const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const fs = require("fs");
const mongoose = require("mongoose");
const profileModel = require("./models/profileSchema.js");
const { MessageEmbed } = require('discord.js');


require("dotenv").config();

const cooldowns = new Set();

const prefix = ">";

///-----Command Handler-----///

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => { //when the client is 'ready' then it will execute everything below
    console.log(`${client.user.tag} is online, hopefully it works`);
    client.user.setActivity("the glorious sounds of capitalism", {
        type: "LISTENING",
    });
});

client.on('guildCreate', joinedGuild => {

    const serverJoin = new MessageEmbed()
    .setColor("#ffff00")
    .setTitle("roycoin")
    .setDescription("roycoin has arrived into your uncapitalist society\n\nIt wont be uncapitalist, for any longer...")
    .setImage("https://cdn.discordapp.com/attachments/891107523757740062/891814157995880498/coinsmall.png")
    .setTimestamp()
    .setFooter("Is this the new Reddit gold replacement? is it???")
    .addFields(
        {name: "Why im here?", value: "Ive just dectected a lack of capitalism here, so i decided to start one and force every single one of you into it"},
        {name: "Cool, what do you do?", value: "You can get coins form me every hour, but heres a twist, you only have a chance of getting it"},
        {name: "What can i do with these coins?", value: "You can spend them ig... i mean, i havent started building my shop in this town yet, you gotta give me some time to build, im not like macdonalds where i can just place a builder like its sims city or something like that. But at the moment ig give it to people that you think deserve it"},
        {name: "Ok now wha...", value: "SHUT UP, youre questions are stupid"},
        {name: "your*", value: "SHUT UP SHUT UP SHUT UP SHUT UP SHUT UP SHUT UP, YOU KNOW WHAT IM GOING TO MAKE THE CHANCE OF GETTING THESE COINS EVEN HARDER"},
        {name: "\n\nHop on roytown", value: "Hop on roytown"},

    )

    joinedGuild.defaultChannel.send({ embeds: [serverJoin] })
    .catch(console.log("No default channel!"))
})

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

    if(message.author.bot) return; //If the user is classified as a bot, everything below will not execute


    ///-----Mongoose-----///

    let profileData;
    try{

        profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id
        if(!profileData) //Checks if the user has any data in the DB
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
    console.log(randomCoinChance);
    if (randomCoinChance === 1){ //if the random number is equal to 7 then it will start the proccess of giving a roy coin
        if (!cooldowns.has(message.author.id)) { //goes to check if the cooldowns map *DOESNT* habe the author's
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id, //looks for the id of the author
            }, {
                $inc: {
                    coins: 1, //when the id of the author is found, it gives them one coin
                }
            });
            
            const royCoinEmbedReward = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Reddit Gold Replacement?');    
            
            if (message.member.roles.cache.some(role => role.name === 'he')){ //checks if the auther has the he/him role
                royCoinEmbedReward.addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good boy`},
                )        
            }
            else if (message.member.roles.cache.some(role => role.name === 'her')){ //checks if the auther has the she/her role
                royCoinEmbedReward.addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good girl`},
                )        
            }
            else{ //If the user has the they/them or dont have a gender role, it will always default to this
                royCoinEmbedReward.addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good child`},
                )            
            }

            message.author.send({ embeds: [royCoinEmbedReward] }); //sends the embed that was just created
            
            cooldowns.add(message.author.id); //Adds a cooldown to the id of the author
            setTimeout(() => {
                // Removes the user from the set after a while
                cooldowns.delete(message.author.id);
            }, 1 * 60000); //First number is minutes the second one times it because it is in milliseconds        
        }
    }
    

    if(!message.content.startsWith(prefix)) return; //if the message didnt start with the bot's prefix, it just goes back to the start
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //this turns the command into lowercase so i dont have to account for complexities like capitilisation

    switch(command){ //This switch case will cycle through all of the cases here to get to something that is true
        case "ping":
            client.commands.get('ping').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
            break;
        //case "leaderboard" || "lb":
        //    client.commands.get('leaderboard').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
        //    break;
        case "balance":
            client.commands.get('balance').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
            break;
        case "donate":
            client.commands.get('donate').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
            break;
        case "give":
            client.commands.get('give').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
        break;
        case "remove":
            client.commands.get('remove').execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
            break;

        
    }
})

client.login(process.env.DISCORD_TOKEN); //this is the token of the bot
    