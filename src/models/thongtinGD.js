"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class thongtingds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  thongtingds.init(
    {
      vnp_Amount: DataTypes.INTEGER,
      vnp_BankCode: DataTypes.STRING,
      vnp_BankTranNo: DataTypes.STRING,
      vnp_CardType: DataTypes.STRING,
      vnp_OrderInfo: DataTypes.STRING,
      vnp_PayDate: DataTypes.STRING,
      vnp_ResponseCode: DataTypes.INTEGER,
      vnp_TmnCode: DataTypes.STRING,
      vnp_TransactionNo: DataTypes.INTEGER,
      vnp_TransactionStatus: DataTypes.INTEGER,
      vnp_TxnRef: DataTypes.INTEGER,
      vnp_SecureHash: DataTypes.STRING,


    },
    {
      sequelize,
      modelName: "thongtingds",
    }
  );
  return thongtingds;
};
