"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class khuyenmais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  khuyenmais.init(
    {
      ten_KM: DataTypes.STRING,
      tile_KM: DataTypes.INTEGER,
      mota_KM: DataTypes.STRING,
      dieukien_KM: DataTypes.INTEGER,
      thoigianbatdau: DataTypes.DATEONLY,
      thoigianketthuc: DataTypes.DATEONLY,

  




    },
    {
      sequelize,
      modelName: "khuyenmais",
    }
  );
  return khuyenmais;
};
