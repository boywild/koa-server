const HttpException = require('./httpException')

class Forbidden extends HttpException {
  constructor(message = '禁止访问', errorCode = 10006) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 403
  }
}

module.exports = Forbidden
