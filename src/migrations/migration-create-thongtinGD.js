"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("thongtingds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vnp_Amount: {
        type: Sequelize.INTEGER,
      },
      vnp_BankCode: {
        type: Sequelize.STRING,
      },    
      vnp_BankTranNo: {
        type: Sequelize.STRING,
      },
      vnp_CardType: {
        type: Sequelize.STRING,
      },  
      vnp_OrderInfo: {
        type: Sequelize.STRING,
      },
      vnp_PayDate: {
        type: Sequelize.STRING,
      },
      vnp_ResponseCode: {
        type: Sequelize.INTEGER,
      },    
      vnp_TmnCode: {
        type: Sequelize.STRING,
      },
      vnp_TransactionNo: {
        type: Sequelize.INTEGER,
      },  
      vnp_TransactionStatus: {
        type: Sequelize.INTEGER,
      },
      vnp_TxnRef: {
        type: Sequelize.INTEGER,
      },  
      vnp_SecureHash: {
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
    await queryInterface.dropTable("thongtingds");
  },
};
