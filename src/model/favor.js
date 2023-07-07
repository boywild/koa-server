const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')
const Art = require('./art')

class Favor extends Model {
  // 判断是否点赞
  static async userLikeIt(uId, artId, type) {
    const favor = await this.findOne({ where: { user_id: uId, art_id: artId, type } })
    return !!favor
  }

  // 点赞
  static async like(artId, type, uid) {
    const params = { user_id: uid, art_id: artId, type }
    const favor = await this.findOne({ where: { ...params } })
    if (favor) {
      throw new global.err.LikeError()
    }
    return sequelize.transaction(async (t) => {
      this.create({ ...params }, { transaction: t })
      const art = await Art.getData(artId, type)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  // 取消点赞
  static async dislike(artId, type, uid) {
    const favor = await this.findOne({ where: { art_id: artId, type, user_id: uid } })
    if (!favor) {
      throw new global.err.DislikeError()
    }
    return sequelize.transaction(async (t) => {
      await favor.destroy({ force: false, transaction: t })
      const art = await Art.getData(artId, type)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
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
