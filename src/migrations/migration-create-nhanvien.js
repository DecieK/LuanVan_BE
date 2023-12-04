"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("nhanviens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Hten_NV: {
        type: Sequelize.STRING,
      },
      Sdt_NV: {
        type: Sequelize.STRING,
      },
      Email_NV: {
        type: Sequelize.STRING,
      },
      Ngaysinh_NV: {
        type: Sequelize.DATEONLY,
      },
      Tuoi_NV: {
        type: Sequelize.INTEGER,
      },
      Diachi_NV: {
        type: Sequelize.STRING,
      },
      Gioitinh_NV: {
        type: Sequelize.STRING,
      },
      Cccd_NV: {
        type: Sequelize.STRING,
      },
      Chucvu_NV: {
        type: Sequelize.STRING,
      },
      // Taikhoan_NV: {
      //   type: Sequelize.STRING,
      // },
      Matkhau_NV: {
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
    await queryInterface.dropTable("nhanviens");
  },
};
