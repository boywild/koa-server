class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

// 参数错误
class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

// 成功
class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 200
  }
}

// 404
class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

// 鉴权失败
class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10004) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

// 禁止
class Forbidden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 403
  }
}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden
}
