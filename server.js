const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./server-side/models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// dist directory
app.use(express.static(__dirname + "/dist/oshop"));

// PathLocationStrategy

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/oshop"));
});

// /dist/oshop/index.html

require("./server-side/routes/user-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ force: true }).then(function () {
  app.listen(port, function () {
    console.log("App listening on PORT " + port);
  });
});
