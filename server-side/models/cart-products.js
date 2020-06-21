module.exports = function (sequelize, DataTypes) {
  const CartProduct = sequelize.define("CartProduct", {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  });

  CartProduct.associate = (models) => {
    CartProduct.belongsTo(models.ShoppingCart, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return CartProduct;
};
