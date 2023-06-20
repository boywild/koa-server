const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Favor extends Model {}

Favor.init(
  {
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  },
  { sequelize, tableName: 'favor', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Favor
