const HttpException = require('./httpException')

class AuthFailed extends HttpException {
  constructor(message = '授权失败', errorCode = 10004) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 401
  }
}

module.exports = AuthFailed
