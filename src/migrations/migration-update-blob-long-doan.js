module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          // queryInterface.changeColumn('phims', 'trailer', {
          //     type: Sequelize.BLOB('long'),
          //     allowNull: true,
          // }),
          queryInterface.changeColumn('doans', 'anhminhhoa', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        })
      ])
  }

//   down: (queryInterface, Sequelize) => {
//       return Promise.all([
//           queryInterface.changeColumn('phims', 'trailer', {
//               type: Sequelize.STRING,
//               allowNull: true,  
//           }),
//           queryInterface.changeColumn('phims', 'poster', {
//             type: Sequelize.STRING,
//             allowNull: true,  
//         })
//       ])
//   }
};