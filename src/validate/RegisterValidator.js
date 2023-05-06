const { Validator, Rule } = require('@/core/validator')
const User = require('@/model/user')

class RegisterValidator extends Validator {
  constructor() {
    super()
    // this.id = [new Rule('isInt', 'id必须为正整数', { min: 1 })]
    this.email = [new Rule('isEmail', '不符合Email规范')]
    this.nickname = [new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 })]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
  }

  // 校验两次输入密码是否相等
  // eslint-disable-next-line class-methods-use-this
  validatePassword(val) {
    const { password1, password2 } = val.body
    if (password1 !== password2) {
      throw new Error('两个密码必须相同')
    }
  }

  // 校验邮箱是否已经注册
  // eslint-disable-next-line class-methods-use-this
  async validateEmail(val) {
    const { email } = val.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Error('该邮箱已注册')
    }
  }
}

module.exports = RegisterValidator
