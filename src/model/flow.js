const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Flow extends Model {}

Flow.init(
  {
    type: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
    art_id: DataTypes.INTEGER
  },
  { sequelize, tableName: 'flow' }
)

module.exports = Flow
