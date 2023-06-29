const HttpException = require('./httpException')

class LikeError extends HttpException {
  constructor(message = '您已经点赞过', errorCode = 60001) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 400
  }
}

module.exports = LikeError
