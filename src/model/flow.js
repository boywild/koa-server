const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Flow extends Model {}

Flow.init(
  {
    type: { type: DataTypes.INTEGER },
    index: { type: DataTypes.INTEGER },
    art_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER, defaultValue: 1 }
  },
  { sequelize, tableName: 'flow', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Flow
