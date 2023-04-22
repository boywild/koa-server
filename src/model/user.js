const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname')

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    open_id: { type: DataTypes.STRING(64), unique: true },
    nickname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING(128), unique: true },
    password: { type: DataTypes.STRING }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = { User }
