const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Sentence extends Model {}

Sentence.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    fav_nums: { type: DataTypes.INET, defaultValue: 0 },
    pub_date: DataTypes.DATEONLY,
    type: DataTypes.INTEGER
  },
  { sequelize, tableName: 'sentence' }
)

module.exports = Sentence
