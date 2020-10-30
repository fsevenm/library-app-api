require("dotenv").config();
const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.github.com",
});

instance.defaults.headers.common["Authorization"] =
  "token " + process.env.GITHUB_TOKEN;

module.exports = instance;
