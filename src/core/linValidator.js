const validator = require('validator')
const { get, set, cloneDeep, isFunction } = require('lodash')
const { findMember } = require('./utils')
const { ParameterException } = require('../core/httpException')
class LinValidator {
  constructor() {
    this.data = {}
    this.parsed = {}
  }

  validate(ctx) {
    const params = this._assembleAllParams(ctx)
    this.data = cloneDeep(params)
    this.parsed = cloneDeep(params)

    const memberKeys = findMember(this, { filter: this._findMembersFilter.bind(this) })
    const errMsg = []
    for (let key of memberKeys) {
      const result = this._check(key)
      if (!result.success) {
        errMsg.push(result.msg)
      }
    }
    if (errMsg.length) {
      throw new ParameterException(errMsg)
    }
    return this
  }

  get(path, parsed = true) {}

  _findMembersFilter(key) {
    if (/validate([A-Z])\w+/g.test(key)) {
      return true
    }
    if (this[key] instanceof Array) {
      const rules = this[key]
      rules.forEach((rule) => {
        const isRuleType = rule instanceof Rule
        if (!isRuleType) {
          throw new Error('验证数组必须全部为Rule类型')
        }
      })
      return true
    }
    return false
  }

  _check(key) {
    let result = null
    const isCustomFunc = isFunction(his[key])
    if (isCustomFunc) {
    } else {
      // 需要校验字段的所有规则
      const rules = this[key]
      // 字段值
      const params = this._findParams(key)
      const ruleField = new RuleFiled(rules)
      result = ruleField.validate(params.value)
      // if (!test.validate) {
      //   result = { success: true, msg: test.msg }
      // }
    }

    return { success: true, msg: 'ok' }
  }

  // 获取所有ctx上挂载的数据
  _assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      header: ctx.request.header,
      path: ctx.params
    }
  }

  // 从ctx上获取需要校验字段对应的值
  _findParams(key) {
    let paramsVal = { value: '', path: [] }
    const fromKey = ['query', 'body', 'path', 'header']
    for (let from in fromKey) {
      const path = [from, key]
      const value = get(this.data, path)
      if (value) {
        res = { value, path }
        break
      }
    }
    return paramsVal
  }
}

// 对某个字段的单条验证规则进行校验
class Rule {
  constructor(name, msg, ...params) {
    this.name = name
    this.msg = msg
    Object.assign(this, { params })
  }

  validate(value) {
    const failValidate = new RuleResult(false)
    const successValidate = new RuleResult(true, '')
    if (!validator[this.name](value + '', ...this.params)) {
      failValidate.msg = this.msg || '参数错误'
      return failValidate
    }
    return successValidate
  }
}

// 验证字段下的所有规则
class RuleFiled {
  constructor(rules = []) {
    this.rules = rules
  }

  validate(value) {
    const failValidate = new RuleFieldResult(false)
    const successValidate = new RuleFieldResult(true, '', '')
    if (!value) {
    } else {
      for (let rule in this.rules) {
        let result = rule.validate(value)
        // 每个字段下只要有一条规则校验失败立即中断并返回错误信息
        if (!result.pass) {
          failValidate.msg = result.msg
          return failValidate
        }
      }
    }
    return successValidate
  }

  _allowEmpty() {
    return this.rules.filter((r) => r.name === 'isOptional').length
  }

  _hasDefault() {
    for (let r in this.rules) {
      if (r.name === 'isOptional' && r.params && r.params[0]) {
        return r.params[0]
      }
    }
  }

  _convert() {}
}

class RuleResult {
  constructor(pass = true, msg = '') {
    this.pass = pass
    this.msg = msg
  }
}
class RuleFieldResult extends RuleResult {
  constructor(pass = true, msg = '', legalValue = '') {
    super(pass, msg)
    this.legalValue = legalValue
  }
}

module.exports = {
  Rule,
  LinValidator
}
