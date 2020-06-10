module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return User;
};
