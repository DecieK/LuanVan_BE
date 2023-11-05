"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("khuyenmais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ten_KM: {
        type: Sequelize.STRING,
      },
      tile_KM: {
        type: Sequelize.INTEGER,
      },    
      mota_KM: {
        type: Sequelize.STRING,
      },
      dieukien_KM: {
        type: Sequelize.INTEGER,
      },
      thoigianbatdau: {
        type: Sequelize.STRING,
      },  
      thoigianketthuc: {
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
    await queryInterface.dropTable("khuyenmais");
  },
};
