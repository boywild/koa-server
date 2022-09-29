const Router = require('@koa/router')
const { ParameterException } = require('../../../core/httpException')

const router = new Router()

router.get('/auth/login', (ctx, next) => {
  // throw new ParameterException()
  throw new Error('哈哈哈')
  ctx.body = { name: 'authLogin' }
})

module.exports = router
