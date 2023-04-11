/* eslint-disable no-restricted-syntax */
const { isFunction, get, set, cloneDeep, last, split, isNull } = require('lodash')
const { findMember } = require('@/utils')
const { ParameterException } = require('@/core/httpException')
const Rule = require('./rule')
const RuleField = require('./ruleField')
const RuleResult = require('./ruleResult')

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
    }
    return get(this.parsed, path)
  }

  // 校验器
  async validate(ctx, alias = {}) {
    const source = Validator.getSource(ctx)
    this.data = cloneDeep(source)
    this.parsed = cloneDeep(source)
    const memberKeys = findMember(this, {
      filter: this.filter.bind(this)
    })
    const errorMsgs = []
    for (const key of memberKeys) {
      // eslint-disable-next-line no-await-in-loop
      const result = await this.check(key, alias)
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
  async check(key, alias = {}) {
    let result
    let k = key
    const isFunc = isFunction(this[k])
    if (isFunc) {
      try {
        await this[k](this.data)
        result = new RuleResult(true)
      } catch (e) {
        result = new RuleResult(false, e.message || e.msg || '参数错误')
      }
    } else {
      const rules = this[k]
      const ruleField = new RuleField(rules)
      k = alias[k] ? alias[k] : k
      const { value, path } = this.findParams(k)
      result = ruleField.validate(value)

      // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
      // 后端设置该k非必传，并设置了未传入该字段情况下的默认值
      // 前端请求接口时没传入相应的字段
      // 此时校验器会通过校验
      if (result.pass) {
        if (!path.length) {
          set(this.parsed, ['default', k], result.legalValue)
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
  static getSource(ctx) {
    return {
      body: ctx.body,
      query: ctx.query,
      path: ctx.path,
      header: ctx.header
    }
  }

  // 过滤并获取特定前缀的方法
  filter(key) {
    if (/^validate[A-Z]\w+/gi.test(key)) {
      return true
    }
    if (this[key] instanceof Array) {
      for (const ele of this[key]) {
        if (!(ele instanceof Rule)) {
          throw new Error('验证数组必须全部为Rule类型')
        }
      }
      return true
    }
    return false
  }

  // 从ctx中获取字段值
  findParams(key) {
    const from = ['body', 'query', 'path', 'header']
    for (const ele of from) {
      const value = get(this.data, [ele, key])
      if (value) {
        const path = [ele, key]
        return { value, path }
      }
    }
    return { value: null, path: [] }
  }
}

module.exports = {
  Validator,
  Rule
}
