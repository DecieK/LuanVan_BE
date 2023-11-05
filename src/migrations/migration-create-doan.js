"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ten: {
        type: Sequelize.STRING,
      },
      anhminhhoa: {
        type: Sequelize.STRING,
      },
      loai: {
        type: Sequelize.STRING,
      },    
      mota: {
        type: Sequelize.STRING,
      },
      gia: {
        type: Sequelize.INTEGER,
      },  
      size: {
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
    await queryInterface.dropTable("doans");
  },
};
