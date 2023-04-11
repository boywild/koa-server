/* eslint-disable no-restricted-syntax */
const RuleFieldResult = require('./ruleFieldResult')

// 校验一组规则
class RuleField {
  constructor(rules) {
    this.rules = rules
  }

  validate(val) {
    if (val === null) {
      // 无字段值
      const allowEmpty = this.allowEmpty()
      const hasDefault = this.hasDefault()
      if (allowEmpty) {
        // 允许为空校验通过
        return new RuleFieldResult(true, '', hasDefault)
      }
      // 不允许为空校验失败
      return new RuleFieldResult(false, '字段是必填参数')
    }
    const filedResult = new RuleFieldResult(false)
    for (const rule of this.rules) {
      const result = rule.validate(val)
      if (!result.pass) {
        // 碰到校验不通过的情况立即返回失败
        filedResult.message = result.message
        filedResult.legalValue = null
        return filedResult
      }
    }
    return new RuleFieldResult(true, '', this.convert(val))
  }

  // 根据校验类型进行值转换
  convert(val) {
    for (const rule of this.rules) {
      if (rule.name === 'isInit') {
        return parseInt(val, 10)
      }
      if (rule.name === 'isFloat') {
        return parseFloat(val)
      }
      if (rule.name === 'isBoolean') {
        return !!val
      }
    }
    return val
  }

  // 字段是否允许为空
  allowEmpty() {
    for (const rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true
      }
    }
    return false
  }

  // 字段是否有默认值
  hasDefault() {
    for (const rule of this.rules) {
      const defaultVal = rule.params[0]
      if (rule.name === 'isOptional' && defaultVal) {
        return defaultVal
      }
    }
    return ''
  }
}

module.exports = RuleField
