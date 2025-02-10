const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.GADGETS_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use this only for development/testing
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to Aiven PostgreSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
