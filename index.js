const Discord = require("discord.js");

const server = require("./server.js");

const config = require("./config.json");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("ready");
});

bot.on("message", (message) => {
  if (message.content !== "!start") return;
  const res = server.startServer();
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    message.channel.send("server is starting");
  }
});

bot.on("message", (message) => {
  if (!message.content.startsWith(":")) return;
  const command = message.content.substring(1);
  const res = server.sendCommand(command);
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    message.channel.send(res.content);
  }
});

bot.login(config.token);
