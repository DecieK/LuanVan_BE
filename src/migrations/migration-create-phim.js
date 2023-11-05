"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("phims", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenphim: {
        type: Sequelize.STRING,
      },
      dieukien: {
        type: Sequelize.INTEGER,
      },
      trailer: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      dienvien: {
        type: Sequelize.STRING,
      },
      ngonngu: {
        type: Sequelize.STRING,
      },
      daodien: {
        type: Sequelize.STRING,
      },
      thoiluong: {
        type: Sequelize.INTEGER,
      },
      ngaychieu	: {
        type: Sequelize.DATEONLY,
      },
      quocgia: {
        type: Sequelize.STRING,
      },
      tomtat: {
        type: Sequelize.STRING,
      },
      nsx: {
        type: Sequelize.STRING,
      },
      trangthai: {
        type: Sequelize.STRING,
      },

      // Trangthaighe: {
      //   type: Sequelize.INTEGER,
      // },
    
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
    await queryInterface.dropTable("phims");
  },
};
