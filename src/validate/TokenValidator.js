const { Validator, Rule } = require('@/core/validator')
// const User = require('@/model/user')

class TokenValidator extends Validator {
  constructor() {
    super()
    this.type = [new Rule('isInt', 'id必须为正整数', { min: 1 })]
    this.account = [new Rule('isLength', { min: 4, max: 32 }, '不符合账号规则')]
    this.password = [
      new Rule('isOptional'),
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
  }

  // eslint-disable-next-line class-methods-use-this
  validateLoginType(val) {
    const loginType = val.body.type
    if (!loginType) {
      throw new Error('type参数缺失')
    }
  }
}

module.exports = TokenValidator
