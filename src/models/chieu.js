"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chieus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chieus.hasOne(models.ves, {
        foreignKey: "id_chieu",
        // targetKey: "keyMap",
        // as: "positionData",
      });
      chieus.belongsTo(models.phims, {
        foreignKey: "id_phim",
        // targetKey: "keyMap",
        // as: "positionData",
      });
    }
  }
  chieus.init(
    {
      ngaychieu: DataTypes.DATEONLY,
      giave: DataTypes.INTEGER,
      id_rap: DataTypes.INTEGER,
      id_suatchieu: DataTypes.INTEGER,
      id_phim: DataTypes.INTEGER,

    },
    {
      sequelize,
      modelName: "chieus",
    }
  );
  return chieus;
};
