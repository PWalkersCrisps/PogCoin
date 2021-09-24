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
    client.user.setActivity("to the glorious sounds of capitalism", {
        type: "LISTENING",
    });
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

    if (!cooldowns.has(message.author.id)) {
        let randomCoinChance = Math.floor(Math.random() * 5)+1 //makes up a random number when a message is created
        if (randomCoinChance === 1){ //if the random number is equal to 7 then it will start the proccess of giving a roy coin

            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id, //it looks for the id of the author
            }, {
                $inc: {
                    coins: 1, //when the id of the author is found, it gives them one coin
                }
            });
            const heHimRole = message.guild.roles.cache.some(r => r.name === 'he');
            const sheHerRole = message.guild.roles.cache.some(r => r.name === 'her');
            
            console.log(sheHerRole);

            if (message.author.roles.has(heHimRole)){
                const royCoinEmbedReward = new MessageEmbed()
                .setColor('#ffff00')
                .addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good boy`},
                )
                .setTimestamp()
                .setFooter('Reddit Gold Replacement?');    
                message.author.send({ embeds: [royCoinEmbedReward] });

            }
            else if (sheHerRole){
                const royCoinEmbedReward = new MessageEmbed()
                .setColor('#ffff00')
                .addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good girl`},
                )
                .setTimestamp()
                .setFooter('Reddit Gold Replacement?');   
                message.author.send({ embeds: [royCoinEmbedReward] });
 
            }
            else{
                const royCoinEmbedReward = new MessageEmbed()
                .setColor('#ffff00')
                .addFields(
                    { name: 'Roy Coin', value: `Youve been rewarded with a Roy Coin for being a good child`},
                )
                .setTimestamp()
                .setFooter('Reddit Gold Replacement?');    
                message.author.send({ embeds: [royCoinEmbedReward] });
                
            }

            // cooldowns.add(message.author.id);
            // setTimeout(() => {
            //    // Removes the user from the set after a while
            //     cooldowns.delete(message.author.id);
            // }, 60 * 60000); //First number is minutes the second one times it because it is in milliseconds
        }
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