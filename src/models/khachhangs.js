"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class khachhangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  khachhangs.init(
    {
      Hten_KH: DataTypes.STRING,
      Sdt_KH: DataTypes.STRING,
      Email_KH: DataTypes.STRING,
      Ngaysinh_KH: DataTypes.DATEONLY,
      Tuoi_KH: DataTypes.STRING,
      Diachi_KH: DataTypes.STRING,
      Gioitinh_KH: DataTypes.STRING,
      Cccd_KH: DataTypes.STRING,
      Mathethanhvien_KH: DataTypes.STRING,
      Diemtichluy_KH: DataTypes.STRING,
      // Taikhoan_KH: DataTypes.STRING,
      // Matkhau_KH: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "khachhangs",
    }
  );
  return khachhangs;
};
