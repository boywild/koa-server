// 校验单个规则
const validator = require('validator')
const RuleResult = require('./ruleResult')

class Rule {
  constructor(name, message, ...params) {
    this.name = name
    this.message = message
    this.params = params
  }

  validate(val) {
    if (!validator[this.name](val, this.params)) {
      // 校验不通过
      return new RuleResult(false, this.message || '参数错误')
    }
    // 校验通过
    return new RuleResult(true, '')
  }
}

module.exports = Rule
