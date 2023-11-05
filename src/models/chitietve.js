"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  chitietves.init(
    {
      id_ve: DataTypes.INTEGER,
      id_ghe: DataTypes.INTEGER,


    },
    {
      sequelize,
      modelName: "chitietves",
    }
  );
  return chitietves;
};
