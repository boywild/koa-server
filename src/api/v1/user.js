const Router = require('@koa/router')
const { PositiveIntegerValidator } = require('@/validate')

const router = new Router()

router.get('/test', async (ctx) => {
  // ctx.router available
  await new PositiveIntegerValidator().validate(ctx)
  ctx.body = { name: 'chentian', age: 20 }
})

module.exports = router
