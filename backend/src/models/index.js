const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Expense = require('./expense')(sequelize, Sequelize);

module.exports = db;
