var db = require("../models");

module.exports = function (app) {
  app.get("/api/shopping-carts", function (req, res) {
    db.ShoppingCart.findAll({ include: [db.CartProduct] }).then(function (
      dbShoppingCart
    ) {
      res.json(dbShoppingCart);
    });
  });

  app.get("/api/cart-product", function (req, res) {
    db.CartProduct.findAll({}).then(function (dbCartProduct) {
      res.json(dbCartProduct);
    });
  });

  app.post("/api/new/shopping-cart", function (req, res) {
    console.log("Success");
    db.ShoppingCart.create({}).then(function (response) {
      res.json(response);
    });
  });
};
