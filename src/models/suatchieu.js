"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class suatchieus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  suatchieus.init(
    {
      giobatdau: DataTypes.TIME,
      gioketthuc: DataTypes.TIME,
      

  




    },
    {
      sequelize,
      modelName: "suatchieus",
    }
  );
  return suatchieus;
};
