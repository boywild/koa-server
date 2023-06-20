const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const sequelize = require('./index')

class User extends Model {
  // 校验邮箱
  static async verifyEmailPassword(email, password) {
    const user = await this.findOne({ where: { email } })
    if (!user) {
      throw new global.err.AuthFailed('账号不存在')
    }
    const correct = await bcrypt.compare(password, user.password)
    if (!correct) {
      throw new global.err.AuthFailed('密码错误')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await this.findOne({ where: { open_id: openid } })
    return user
  }

  static async registerByOpenid(openid) {
    const user = await this.create({ open_id: openid })
    return user
  }
}

User.init(
  {
    open_id: { type: DataTypes.STRING(64), unique: true },
    nickname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING(128), unique: true },
    password: {
      type: DataTypes.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const pwd = bcrypt.hashSync(val, salt)
        this.setDataValue('password', pwd)
      }
    }
  },
  {
    sequelize,
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
)

module.exports = User
