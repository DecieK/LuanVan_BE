"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nhanviens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  nhanviens.init(
    {
      Hten_NV: DataTypes.STRING,
      Sdt_NV: DataTypes.STRING,
      Email_NV: DataTypes.STRING,
      Ngaysinh_NV: DataTypes.DATEONLY,
      Tuoi_NV: DataTypes.STRING,
      Diachi_NV: DataTypes.STRING,
      Gioitinh_NV: DataTypes.STRING,
      Cccd_NV: DataTypes.STRING,
      Chucvu_NV: DataTypes.STRING,
      // Taikhoan_NV: DataTypes.STRING,
      // Matkhau_NV: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nhanviens",
    }
  );
  return nhanviens;
};
