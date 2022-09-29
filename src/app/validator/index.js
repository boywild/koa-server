const { LinValidator, Rule } = require('../../core/linValidator')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', {
        min: 1
      })
    ]
    this.email = [new Rule('isEmail', '不符合Email规范')]
    this.password1 = [
      // 用户指定范围 123456 $^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
  }
}
module.exports = { PositiveIntegerValidator }
