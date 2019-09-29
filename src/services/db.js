require('dotenv').config({ path: '../env/tokens.env' });
const Sequelize = require('sequelize');
const logger = require('../controllers/helpers/logger');

const CONFIG = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: {
    dialect: 'postgres',
  },
};

const sequelize = new Sequelize(
  CONFIG.database,
  CONFIG.username,
  CONFIG.password,
  CONFIG.options,
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    logger(__filename, err);
  });

module.exports = sequelize.define('notification', {
  notificationId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
  },
  text: {
    type: Sequelize.STRING,
  },
  repeat: {
    type: Sequelize.BOOLEAN,
  },
});
module.exports.operator = Sequelize.Op;
