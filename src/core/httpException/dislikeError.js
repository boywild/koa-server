const HttpException = require('./httpException')

class DislikeError extends HttpException {
  constructor(message = '您已取消点赞', errorCode = 60001) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 400
  }
}

module.exports = DislikeError
