module.exports = function (sequelize, DataTypes) {
  const ShoppingCart = sequelize.define("ShoppingCart", {});

  ShoppingCart.associate = (models) => {
    ShoppingCart.hasMany(models.CartProduct);
  };

  return ShoppingCart;
};
