const RuleResult = require('./ruleResult')

class RuleFieldResult extends RuleResult {
  constructor(pass, message, legalValue = null) {
    super()
    this.pass = pass
    this.message = message
    this.legalValue = legalValue
  }
}

module.exports = RuleFieldResult
