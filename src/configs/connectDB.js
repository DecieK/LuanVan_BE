const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("bookingticket", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công.");
  } catch (error) {
    console.error("Không thể kết nối đến database:", error);
  }
};

module.exports = connectDB;
