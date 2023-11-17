"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("khachhangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Hten_KH: {
        type: Sequelize.STRING,
      },
      Sdt_KH: {
        type: Sequelize.STRING,
      },
      Email_KH: {
        type: Sequelize.STRING,
      },
      Ngaysinh_KH: {
        type: Sequelize.DATEONLY,
      },
      Tuoi_KH: {
        type: Sequelize.INTEGER,
      },
      Diachi_KH: {
        type: Sequelize.STRING,
      },
      Gioitinh_KH: {
        type: Sequelize.STRING,
      },
      Cccd_KH: {
        type: Sequelize.STRING,
      },
      Mathethanhvien_KH: {
        type: Sequelize.INTEGER,
      },
      Diemtichluy_KH: {
        type: Sequelize.INTEGER,
      },
      // Taikhoan_KH: {
      //   type: Sequelize.STRING,
      // },
      Matkhau_KH: {
        type: Sequelize.STRING,
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("khachhangs");
  },
};
