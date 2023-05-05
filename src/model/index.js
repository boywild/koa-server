const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname')

module.exports = sequelize
