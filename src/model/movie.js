const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Movie extends Model {}

Movie.init(
  {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    fav_nums: { type: DataTypes.INTEGER, defaultValue: 0 },
    pub_date: { type: DataTypes.DATEONLY },
    type: { type: DataTypes.INTEGER }
  },
  { sequelize, tableName: 'movie', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Movie
