const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')

class Favor extends Model {
  static async userLikeIt(uId, artId, type) {
    const favor = await this.findOne({ where: { user_id: uId, art_id: artId, type } })
    return !!favor
  }
}

Favor.init(
  {
    user_id: DataTypes.INTEGER,
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  },
  { sequelize, tableName: 'favor', createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' }
)

module.exports = Favor
