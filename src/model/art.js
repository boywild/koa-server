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
}

module.exports = Art
