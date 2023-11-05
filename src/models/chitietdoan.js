"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietdoans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  chitietdoans.init(
    {
      slda: DataTypes.INTEGER,
      id_doan: DataTypes.INTEGER,


  




    },
    {
      sequelize,
      modelName: "chitietdoans",
    }
  );
  return chitietdoans;
};
