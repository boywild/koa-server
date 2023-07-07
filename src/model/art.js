const { Op } = require('sequelize')
const { flatten } = require('lodash')
const Movie = require('./movie')
const Music = require('./music')
const Sentence = require('./sentence')

class Art {
  static async getData(id, type) {
    let art = {}
    const params = { where: { id } }
    switch (type) {
      case 100:
        art = await Movie.findOne(params)
        break
      case 200:
        art = await Music.findOne(params)
        break
      case 300:
        art = await Sentence.findOne(params)
        break
      case 400:
        art = await Sentence.findOne(params)
        break
      default:
        art = await Sentence.findOne(params)
        break
    }

    return art
  }

  // 详情
  static async getDetail(id, type, uid = '') {
    // eslint-disable-next-line global-require
    const Favor = require('./favor')
    const art = await Art.getData(id, type)
    if (uid) {
      const isFavor = await Favor.userLikeIt(uid, id, type)
      art.dataValues.like_status = isFavor
    } else {
      art.dataValues.like_status = false
    }
    return art || {}
  }

  static async getList(favor) {
    const list = {
      100: [],
      200: [],
      300: []
    }
    favor.forEach((ele) => {
      list[ele.type].push(ele.art_id)
    })
    const arr = []

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (let k in list) {
      k = parseInt(k, 10)
      // eslint-disable-next-line no-await-in-loop
      const arts = await Art.getListByType(list[k], k)
      arr.push(arts)
    }

    return flatten(arr)
  }

  static async getListByType(ids, type) {
    let art = []
    switch (type) {
      case 100:
        art = await Movie.findAll({ where: { id: { [Op.in]: ids } } })
        break
      case 200:
        art = await Music.findAll({ where: { id: { [Op.in]: ids } } })
        break
      case 300:
        art = await Sentence.findAll({ where: { id: { [Op.in]: ids } } })
        break
      case 400:
        art = await Sentence.findAll({ where: { id: { [Op.in]: ids } } })
        break
      default:
        art = await Sentence.findAll({ where: { id: { [Op.in]: ids } } })
        break
    }

    return art
  }
}

module.exports = Art
