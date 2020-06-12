module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    imageURL: DataTypes.STRING,
  });
  return Product;
};
