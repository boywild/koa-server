const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('7yue', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: true,
  timezone: '+08:00'
})

// async function testConnect() {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }
// testConnect()
;(async () => {
  await sequelize.sync({ force: true })
})()

module.exports = sequelize
