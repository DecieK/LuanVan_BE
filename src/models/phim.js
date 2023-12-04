"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      phims.hasMany(models.chieus, {
        foreignKey: "id_phim",
        // targetKey: "keyMap",
        // as: "positionData",
      });
    }
  }
  phims.init({
    tenphim: DataTypes.STRING,
    dieukien: DataTypes.INTEGER,
    trailer: DataTypes.STRING,
    poster: DataTypes.STRING,
    dienvien: DataTypes.STRING,
    ngonngu: DataTypes.STRING,
    daodien: DataTypes.STRING,
    thoiluong: DataTypes.INTEGER,
    ngaychieu: DataTypes.DATEONLY,
    quocgia: DataTypes.STRING,
    tomtat: DataTypes.STRING,
    nsx: DataTypes.STRING,
    trangthai: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "phims",
  });
  return phims;
};