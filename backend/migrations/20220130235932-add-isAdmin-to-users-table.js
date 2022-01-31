module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'isAdmin', {// users en mayuscule
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }, { transaction: t })
   
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'isAdmin', { transaction: t })
      ]);
    });
  }
};