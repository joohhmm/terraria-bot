const axios = require("axios");

exports.ip4 = async () => {
  const res = await axios.get("http://ip4only.me/api/");
  if (res.status === 200) {
    return res.data.split(",")[1];
  }
  return null;
};
