const express = require("express");
const routes = require("./../routes");

const app = express();

app.get("/", (req, res) => res.send("Welcome to Library app API."));

app.use("/api", routes);

module.exports = app;
