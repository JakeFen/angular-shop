var db = require("../models");

module.exports = function (app) {
  app.get("/api/products/:id", function (req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  app.get("/api/products", function (req, res) {
    db.Product.findAll({}).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  app.get("/api/products/category/:category", function (req, res) {
    db.Product.findAll({
      where: {
        category: req.params.category,
      },
    }).then(function (dbProducts) {
      res.json(dbProducts);
    });
  });

  app.put("/api/product/update/:id", function (req, res) {
    db.Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageURL: req.body.imageURL,
      },
      { where: { id: req.params.id } }
    ).then(function (dbProduct) {
      res.json(dbProduct);
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

  app.delete("/api/product/delete/:id", function (req, res) {
    db.Product.destroy({
      where: { id: req.params.id },
    }).then(function (dbProduct) {
      res.json(dbProduct);
    });
  });
};
