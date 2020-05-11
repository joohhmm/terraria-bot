const Discord = require("discord.js");

const server = require("./server.js");
const { ip4 } = require("./ip4.js");

const config = require("./config.json");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("ready");
});

bot.on("message", async (message) => {
  if (message.content !== "!start") return;
  const res = server.start();
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    message.channel.send(`server is starting on ${await ip4()}:${config.port}`);
    bot.user.setActivity('Terraria');
  }
});

bot.on("message", (message) => {
  if (!message.content.startsWith("!stop")) return;

  const res = server.exit();
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    message.channel.send("server is stopping");
    bot.user.setActivity('Not Terraria');
  }
});

bot.on("message", (message) => {
  if (!message.content.startsWith("!save")) return;

  const res = server.save();
  if (res.status) {
    message.channel.send(
      `failed with error code: ${res.status}, error message: ${res.content}`
    );
  } else {
    message.channel.send('server is saving');
  }
});

bot.login(config.token);
