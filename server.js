const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/oshop"));

// PathLocationStrategy

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/oshop/index.html"));
});

app.listen(port, function () {
  console.log("App listening on PORT " + port);
});
