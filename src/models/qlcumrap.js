"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class qlcumraps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  qlcumraps.init(
    {
      ten_tttt: DataTypes.STRING,
      diachi: DataTypes.STRING, 
    },
    {
      sequelize,
      modelName: "qlcumraps",
    }
  );
  return qlcumraps;
};

