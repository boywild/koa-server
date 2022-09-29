const { HttpException } = require('../core/httpException')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    if (isHttpException) {
      const msg = error.msg || error.message
      const errorCode = error.errorCode
      const code = error.code
      ctx.body = { msg, errorCode, request: `${ctx.method} ${ctx.path}` }
      ctx.status = code
    } else {
      // 捕获其他错误
      ctx.body = { msg: error.message || 'we made a mistake O(∩_∩)O~~', errorCode: 999, request: `${ctx.method} ${ctx.path}` }
      ctx.status = 500
    }
  }
}
module.exports = catchError
