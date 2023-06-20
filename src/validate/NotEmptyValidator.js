const { Validator, Rule } = require('@/core/validator')

class NotEmptyValidator extends Validator {
  constructor() {
    super()
    this.token = [new Rule('isLength', 'token不允许为空', { min: 1 })]
  }
}

module.exports = NotEmptyValidator
