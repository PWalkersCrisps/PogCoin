module.exports = (client, Discord) =>{
    try{
        const readyMessage = `${client.user.tag} is online, hopefully it works`

        console.log(readyMessage);

        client.user.setActivity("the glorious sounds of capitalism", {
            type: "LISTENING",
        });
    }
    catch(err){
        console.log(err);
    }
}