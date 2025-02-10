const { Sequelize } = require('sequelize');
const user_sequelize = new Sequelize(process.env.USERS_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use this only for development/testing
    }
  }
});

user_sequelize.authenticate()
  .then(() => {
    console.log('Connection to Aiven PostgreSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = user_sequelize;
