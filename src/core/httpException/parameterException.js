const HttpException = require('./httpException')

class ParameterException extends HttpException {
  constructor(message = '参数错误', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 400
  }
}

module.exports = ParameterException
