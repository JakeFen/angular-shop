var db = require("../models");

module.exports = function (app) {
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/newUser", function (req, res) {
    db.User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      password: req.body.password,
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/user/:username/:password", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username,
        password: req.params.password,
      },
    }).then(function (user) {
      res.json(user);
      console.log(user);
    });
  });
};
