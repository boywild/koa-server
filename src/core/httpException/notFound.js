const HttpException = require('./httpException')

class NotFound extends HttpException {
  constructor(message = '资源未找到', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 404
  }
}

module.exports = NotFound
