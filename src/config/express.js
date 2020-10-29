const express = require("express");
const routes = require("./../routes");

const app = express();

app.use(express.json({}));

app.get("/", (req, res) => res.send("Welcome to Library app API."));

app.use("/api", routes);

app.use("*", (req, res) => res.sendStatus(404));

module.exports = app;
