const Discord = require("discord.js");

const server = require("./server.js");
const {ip4} = require("./ip4.js");

const config = require("./config.json");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("ready");
});

bot.on("message", async (message) => {
  if (message.content !== "!start") return;
  const res = server.startServer();
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    
    message.channel.send(`server is starting on ${await ip4()}:${config.port}`);
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
