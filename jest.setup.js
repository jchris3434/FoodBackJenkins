const { sequelize } = require('./models');

// Avant chaque test, on synchro vec la bdd Sequelize
beforeEach(async () => {
  await sequelize.sync(); 
});

// apreschaque test ca ferme la connexion sequelize
afterAll(async () => {
  await sequelize.close();
});
