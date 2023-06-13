const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Music extends Model {}

Music.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    fav_nums: { type: DataTypes.INET, defaultValue: 0 },
    pub_date: DataTypes.DATEONLY,
    type: DataTypes.INTEGER,
    url: DataTypes.STRING
  },
  { sequelize, tableName: 'music' }
)

module.exports = Music
