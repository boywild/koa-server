const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql://root:123456@localhost:3306/7yue')

sequelize.sync({
  force: false
})

module.exports = sequelize
