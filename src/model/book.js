const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Book extends Model {}

Book.init(
  {
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    pub_date: DataTypes.DATEONLY,
    fav_nums: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { sequelize, tableName: 'book', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Book
