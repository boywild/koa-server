const auth = require('basic-auth')
const jwt = require('jsonwebtoken')
const config = require('@/config')

class Auth {
  constructor(level) {
    this.level = level
  }

  m() {
    return async (ctx, next) => {
      const token = auth(ctx.req)
      let errMsg = 'token不合法'
      let decode = {}
      if (!token || !token.name) {
        throw new global.err.Forbidden(errMsg)
      }
      try {
        decode = jwt.verify(token.name, config.security.key)
      } catch (e) {
        if (e.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        if (e.name === 'JsonWebTokenError') {
          errMsg = 'token无效'
        }
        throw new global.err.Forbidden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.err.Forbidden(errMsg)
      }

      ctx.auth = {
        scope: decode.scope,
        token: decode.token
      }

      next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, config.security.key)
      return true
    } catch (e) {
      return false
    }
  }
}
module.exports = Auth
