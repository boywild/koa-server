const { ART_TYPE } = require('@/config/enum')
const { Rule } = require('@/core/validator')
const { PositiveIntegerValidator } = require('./index')

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.type = [new Rule('isInt', 'type必须为正整数', { min: 1 })]
  }

  // eslint-disable-next-line class-methods-use-this
  validateType(val) {
    let type = val.body.type || val.path.type
    if (!type) {
      throw new Error('type是必须参数')
    }

    type = parseInt(type, 10)
    const isRealType = (list, key) => {
      return list.includes(key)
    }
    const list = Object.values(ART_TYPE)

    if (!isRealType(list, type)) {
      throw new Error('type参数不合法')
    }
  }
}

module.exports = LikeValidator
