module.exports = () =>{
    const channel = client.channels.cache.find(channel => channel.name === "heroku-log")

    const readyMessage = `${client.user.tag} is online, hopefully it works`

    console.log(readyMessage);
    channel.send(readyMessage);

    client.user.setActivity("the glorious sounds of capitalism", {
        type: "LISTENING",
    });
}