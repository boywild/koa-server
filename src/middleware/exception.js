const { HttpException } = require('../core/httpException')

const exception = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const isHttpException = e instanceof HttpException
    if (!isHttpException) {
      throw e
    }
    // 参数校验错误
    if (isHttpException) {
      const { message = '', code, errorCode } = e
      ctx.body = {
        message,
        errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = code
    } else {
      // 其它未知类型错误
      ctx.body = {
        message: message || 'we made a mistake O(∩_∩)O~~',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = exception
