const cp = require("child_process");
const config = require("./config.json");

let server = undefined;

exports.start = () => {
  if (server) return { server, status: 0 };
  server = cp.spawn(config.serverPath, ["-config", config.serverConfigPath]);
  return { server, status: 0 };
};

exports.save = () => {
  server.stdin.write("save\n");
  return { status: 0 };
};

exports.exit = () => {
  server.stdin.write("exit\n");
  server = null
  return { status: 0 };
};
