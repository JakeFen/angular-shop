var db = require("../models");

module.exports = function (app) {
  app.get("/api/products", function (req, res) {
    db.Product.findAll({}).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });
  app.post("/api/new-product", function (req, res) {
    db.Product.create({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      imageURL: req.body.imageURL,
    }).then(function (dbProduct) {
      res.json(dbProduct);
    });
  });
};
