// 校验规则生成器
// 校验结果生成器
//从ctx.query/body/path/header获取源数据
// 提取特定的方法和字段
// 根据需要校验的字段从源数据种匹配对应的值
// 对所有字段挨个进行校验，存储所有错误校验信息
// 对每个字段种的多个规则进行逐个校验-判断是否为必填字段

const validate = require('validator')
const { isFunction } = require('lodash')

class Validator {
  get(key) {}
  validate(ctx) {
    return this
  }

  // 从body/query/path/header种获取数据源
  _getSource(ctx) {
    return {
      body: ctx.body,
      query: ctx.query,
      path: ctx.path,
      header: ctx.header
    }
  }
}

// 校验单个规则
class Rule {
  constructor(name, message, ...params) {
    this.name = name
    this.message = message
    this.params = params
  }

  validate(val) {
    if (!validate[this.name](val, this.params)) {
      // 校验不通过
      return new RuleResult(false, message || '参数错误')
    }
    // 校验通过
    return new RuleResult(true, '')
  }
}

class RuleResult {
  constructor(pass, message) {
    this.pass = pass
    this.message = message
  }
}

// 校验一组规则
class RuleField {
  constructor(rules) {
    this.rules = rules
  }

  validate(val) {
    if (val === null) {
      // 无字段值
      const allowEmpty = this._allowEmpty()
      const hasDefault = this._hasDefault()
      if (allowEmpty) {
        // 允许为空校验通过
        return new RuleFieldResult(true, '', hasDefault)
      } else {
        // 不允许为空校验失败
        return new RuleFieldResult(false, '字段是必填参数')
      }
    } else {
      const filedResult = new RuleFieldResult(false)
      for (let rule of this.rules) {
        const result = rule.validate(val)
        if (!result.pass) {
          // 碰到校验不通过的情况立即返回失败
          filedResult.message = result.message
          filedResult.legalValue = nullr
          return filedResult
        }
      }
      return new RuleFieldResult(true, '', this._convert(val))
    }
  }

  // 根据校验类型进行值转换
  _convert(val) {
    for (let rule of this.rules) {
      if (rule.name === 'isInit') {
        return parseInt(val)
      }
      if (rule.name === 'isFloat') {
        return parseFloat(val)
      }
      if (rule.name === 'isBoolean') {
        return val ? true : false
      }
    }
  }

  // 字段是否允许为空
  _allowEmpty() {
    for (let rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true
      }
    }
    return false
  }

  // 字段是否有默认值
  _hasDefault() {
    for (let rule of this.rules) {
      const defaultVal = rule.params[0]
      if (rule.name === 'isOptional' && defaultVal) {
        return defaultVal
      }
    }
    return ''
  }
}

class RuleFieldResult extends RuleResult {
  constructor(pass, message, legalValue = null) {
    this.pass = pass
    this.message = message
    this.legalValue = legalValue
  }
}
