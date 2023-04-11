const HttpException = require('./httpException')

class Success extends HttpException {
  constructor(message = 'ok', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 200
  }
}

module.exports = Success
