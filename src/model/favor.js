const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Favor extends Model {}

Favor.init(
  {
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  },
  { sequelize, tableName: 'favor' }
)

module.exports = Favor
