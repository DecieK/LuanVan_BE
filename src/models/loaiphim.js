"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loaiphims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      loaiphims.hasOne(models.chitietloaiphims, {
        foreignKey: "id_loaiphim",
        // targetKey: "keyMap",
        // as: "positionData",
      });
    }
  }
  loaiphims.init(
    {
      tenloai: DataTypes.STRING,
      


    },
    {
      sequelize,
      modelName: "loaiphims",
    }
  );
  return loaiphims;
};

