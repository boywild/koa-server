const Router = require('@koa/router')
const { ParameterException } = require('../../core/httpException')

const router = new Router()

router.get('/test', (ctx, next) => {
  // ctx.router available
  throw new ParameterException()
  ctx.body = { name: 'chentian', age: 20 }
})

module.exports = router
