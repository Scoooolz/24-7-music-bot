const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const {
    token,
    channel_id,
    video_urls
} = require("./config.json");
const client = new Discord.Client();
const port = 3000;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('Looks your bot is online!');
});

app.listen(port);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    const voiceChannel = client.channels.cache.get(channel_id);
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel");
        function play(connection) {
            const stream = ytdl(video_urls[Math.floor(Math.random() * video_urls.length)], { filter: "audioonly" });
            const dispatcher = connection.play(stream);
            dispatcher.on("finish", () => {
                play(connection);
            });
        };

        play(connection);
    });
});

client.login(token);
