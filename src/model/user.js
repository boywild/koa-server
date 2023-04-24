const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const sequelize = require('./index')

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    open_id: { type: DataTypes.STRING(64), unique: true },
    nickname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING(128), unique: true },
    password: {
      type: DataTypes.STRING,
      set(val) {
        const salt = bcrypt.genSalt(10)
        const pwd = bcrypt.hashSync(val, salt)
        this.setDataValue(pwd)
      }
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = { User }
