"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class danhgias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  danhgias.init(
    {
      noidung: DataTypes.STRING,
      sosao: DataTypes.INTEGER,
      id_KH: DataTypes.INTEGER,
      id_phim: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "danhgias",
    }
  );
  return danhgias;
};
