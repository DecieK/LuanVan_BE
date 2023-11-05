"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("chieus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ngaychieu: {
        type: Sequelize.DATEONLY,
      },
      giave: {
        type: Sequelize.INTEGER,
      },    
      id_rap: {
        type: Sequelize.INTEGER,
      },
      id_suatchieu: {
        type: Sequelize.INTEGER,
      },  
      id_phim: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("chieus");
  },
};
