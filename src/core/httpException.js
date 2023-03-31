class HttpException extends Error {
  constructor(message = '', errorCode, code) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = code
  }
}

module.exports = {
  HttpException
}
