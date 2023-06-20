const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Sentence extends Model {}

Sentence.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    fav_nums: { type: DataTypes.INTEGER, defaultValue: 0 },
    pub_date: DataTypes.DATEONLY,
    type: DataTypes.INTEGER
  },
  { sequelize, tableName: 'sentence', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Sentence
