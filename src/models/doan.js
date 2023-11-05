"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  doans.init(
    {
      ten: DataTypes.STRING,
      anhminhhoa: DataTypes.STRING,
      loai: DataTypes.STRING,
      mota: DataTypes.STRING,
      gia: DataTypes.INTEGER,
      size: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "doans",
    }
  );
  return doans;
};
