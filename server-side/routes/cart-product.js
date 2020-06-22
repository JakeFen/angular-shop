var db = require("../models");

module.exports = function (app) {
  app.get("/api/shopping-cart/:shoppingId/items/:productId", function (
    req,
    res
  ) {
    db.CartProduct.findOne({
      include: [db.ShoppingCart],
      where: {
        productId: req.params.productId,
        ShoppingCartId: req.params.shoppingId,
      },
    }).then(function (dbShoppingCart) {
      res.json(dbShoppingCart);
    });
  });

  app.put("/api/shopping-cart/item/update/:shoppingId/:productId", function (
    req,
    res
  ) {
    db.CartProduct.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: {
          productId: req.params.productId,
          ShoppingCartId: req.params.shoppingId,
        },
      }
    ).then(function (response) {
      res.json(response);
    });
  });

  app.post("/api/new/cart-product/:cartId", function (req, res) {
    const body = req.body;
    console.log(body);

    db.CartProduct.create({
      include: [db.ShoppingCart],
      title: body.title,
      price: body.price,
      category: body.category,
      imageURL: body.imageURL,
      quantity: 1,
      productId: body.id,
      ShoppingCartId: req.params.cartId,
    }).then(function (dbCartProduct) {
      res.json(dbCartProduct);
      console.log("Cart Success");
    });
  });
};
