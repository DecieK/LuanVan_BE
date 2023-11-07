"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ves", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Hten_KH: {
        type: Sequelize.STRING,
      },
      HTTT: {
        type: Sequelize.STRING,
      },
      Tongtien: {
        type: Sequelize.INTEGER,
      },
      SLghe: {
        type: Sequelize.INTEGER,
      },
      Ngaymuave: {
        type: Sequelize.DATEONLY,
      },
      id_KH: {
        type: Sequelize.INTEGER,
      },
      id_suatchieu: {
        type: Sequelize.INTEGER,
      },
      id_chieu: {
        type: Sequelize.INTEGER,
      },
      id_rap: {
        type: Sequelize.INTEGER,
      },
      id_cumrap: {
        type: Sequelize.INTEGER,
      },
      id_KM: {
        type: Sequelize.INTEGER,
      },
      id_NV: {
        type: Sequelize.INTEGER,
      },
      maCode: {
        // allowNull: false,
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
    await queryInterface.dropTable("ves");
  },
};
