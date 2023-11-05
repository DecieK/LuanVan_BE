"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  tests.init(
    {
      image: DataTypes.STRING     

    },
    {
      sequelize,
      modelName: "tests",
    }
  );
  return tests;
};
