const cp = require("child_process");
const config = require("./config.json");

let server = undefined;

exports.startServer = () => {
  if (server) return { server, status: 0 };
  server = cp.spawn(config.serverPath, ["-config", config.serverConfigPath]);
  return { server, status: 0 };
};

exports.sendMessage = () => {
  // something here to send messages
};
