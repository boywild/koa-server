class HttpException extends Error {
  constructor(message = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(message = '参数错误', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 400
  }
}

class Success extends HttpException {
  constructor(message = 'ok', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 200
  }
}
class NotFound extends HttpException {
  constructor(message = '资源未找到', errorCode = 10000) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 404
  }
}
class AuthFailed extends HttpException {
  constructor(message = '授权失败', errorCode = 10004) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 401
  }
}

class Forbidden extends HttpException {
  constructor(message = '禁止访问', errorCode = 10006) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.code = 403
  }
}

module.exports = {
  HttpException,
  Success,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbidden
}
