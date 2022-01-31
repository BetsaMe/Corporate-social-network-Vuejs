module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'isAdmin', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }, { transaction: t })
   
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'isAdmin', { transaction: t })
      ]);
    });
  }
};