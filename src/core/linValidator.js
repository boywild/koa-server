const validator = require('validator')
const { get, set, cloneDeep } = require('lodash')
const { findMember } = require('./utils')
class LinValidator {
  constructor() {
    this.data = {}
    this.parsed = {}
  }
  validate(ctx) {
    const memberKeys = findMember(this, { filter: this._findMembersFilter.bind(this) })
    const errMsg = []
    for (let key of memberKeys) {
      const result = this._check(key)
      if (!result.success) {
        errMsg.push(result.msg)
      }
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
  _check() {}
}

class Rule {
  constructor() {}

  validate(value) {}
}

class RuleFiled {
  constructor() {}
  validate() {}
}

module.exports = {
  Rule,
  LinValidator
}
