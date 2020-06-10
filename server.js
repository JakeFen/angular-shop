const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/oshop"));

// PathLocationStrategy

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname + "/dist/oshop/index.html"))
);

const server = http.createServer(app);

server.listen(port, () => console.log("Running..."));
