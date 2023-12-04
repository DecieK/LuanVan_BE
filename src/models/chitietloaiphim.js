"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietloaiphims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chitietloaiphims.belongsTo(models.loaiphims, {
        foreignKey: "id_loaiphim",
        // targetKey: "keyMap",
        // as: "positionData",
      });
    }
  }
  chitietloaiphims.init(
    {
      id_phim: DataTypes.INTEGER,
      id_loaiphim: DataTypes.INTEGER,

    },
    {
      sequelize,
      modelName: "chitietloaiphims",
    }
  );
  return chitietloaiphims;
};
