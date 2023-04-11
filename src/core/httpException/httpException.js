class HttpException extends Error {
  constructor(message = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = code
  }
}

module.exports = HttpException
