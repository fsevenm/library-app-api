const github = require("../repositories/github");

async function getUserInfo(username) {
  const { status, data } = await github.user.getInfo(username);
  if (status === 200) {
    return data;
  }
  return false;
}

module.exports = {
  getUserInfo,
};
