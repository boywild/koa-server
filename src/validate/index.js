const { Validator, Rule } = require('@/core/validator')

class PositiveIntegerValidator extends Validator {
  constructor() {
    super()
    this.id = [new Rule('isInt', 'id必须为正整数', { min: 1 })]
  }
}

module.exports = {
  PositiveIntegerValidator
}
