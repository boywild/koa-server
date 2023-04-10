const validator = require('validator')
const { isFunction, get, cloneDeep, last, split, isNull } = require('lodash')
const { ParameterException } = require('./httpException')
const { findMember } = require('../utils')

class Validator {
  constructor() {
    this.data = {}
    this.parsed = {}
  }

  // 获取器
  get(path, parsed = true) {
    if (parsed) {
      const val = get(this.parsed, path, null)
      if (isNull(val)) {
        const key = last(split(path, '.'))
        return get(this.parsed, ['default', key])
      }
      return val
    } else {
      return get(this.parsed, path)
    }
  }

  // 校验器
  async validate(ctx, alias = {}) {
    const source = this._getSource(ctx)
    this.data = cloneDeep(source)
    this.parsed = cloneDeep(source)
    const memberKeys = findMember(this, {
      filter: this._filter.bind(this)
    })
    const errorMsgs = []
    for (let key of memberKeys) {
      const result = await this._check(key, alias)
      if (!result.success) {
        errorMsgs.push(result.msg)
      }
    }
    if (errorMsgs.length) {
      throw new ParameterException(errorMsgs)
    }
    return this
  }

  // 对字段进行规则校验
  async _check(key, alias = {}) {
    let result
    const isFunc = isFunction(this[key])
    if (isFunc) {
      try {
        await this[key](this.data)
        result = new RuleResult(true)
      } catch (e) {
        result = new RuleResult(false, e.message || e.msg || '参数错误')
      }
    } else {
      const rules = this[key]
      const ruleField = new RuleField(rules)
      key = alias[key] ? alias[key] : key
      const { value, path } = this._findParams(key)
      result = ruleField.validate(value)

      // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
      // 后端设置该key非必传，并设置了未传入该字段情况下的默认值
      // 前端请求接口时没传入相应的字段
      // 此时校验器会通过校验
      if (result.pass) {
        if (!path.length) {
          set(this.parsed, ['default', key], result.legalValue)
        }
        // else {
        //   set(this.parsed, path, result.legalValue)
        // }
      }
    }
    if (!result.pass) {
      return {
        msg: `${isFunc ? '' : key}${result.message}`,
        success: false
      }
    }
    return { msg: 'ok', success: true }
  }

  // 从body/query/path/header获取数据源
  _getSource(ctx) {
    return {
      body: ctx.body,
      query: ctx.query,
      path: ctx.path,
      header: ctx.header
    }
  }

  // 过滤并获取特定前缀的方法
  _filter(key) {
    if (/^validate[A-Z]\w+/gi.test(key)) {
      return true
    }
    if (this[key] instanceof Array) {
      for (let ele of this[key]) {
        if (!ele instanceof Rule) {
          throw new Error('验证数组必须全部为Rule类型')
        }
      }
      return true
    }
    return false
  }

  // 从ctx中获取字段值
  _findParams(key) {
    const from = ['body', 'query', 'path', 'header']
    for (let ele of from) {
      const value = get(this.data, [ele, key])
      if (value) {
        const path = [ele, key]
        return { value, path }
      }
    }
    return { value: null, path: [] }
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
    if (!validator[this.name](val, this.params)) {
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
          filedResult.legalValue = null
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
    super()
    this.pass = pass
    this.message = message
    this.legalValue = legalValue
  }
}

module.exports = {
  Validator,
  Rule
}
