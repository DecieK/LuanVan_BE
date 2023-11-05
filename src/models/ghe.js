"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ghes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  ghes.init(
    {
      maGhe: DataTypes.STRING,
      loaiGhe: DataTypes.STRING,
      id_rap: DataTypes.INTEGER,



    },
    {
      sequelize,
      modelName: "ghes",
    }
  );
  return ghes;
};
