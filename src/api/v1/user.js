const Router = require('@koa/router')
const { generateToken } = require('@/utils/index')
// const { PositiveIntegerValidator } = require('@/validate')

const router = new Router({ prefix: '/v1/user' })

router.get('/test', async (ctx) => {
  // ctx.router available
  // await new PositiveIntegerValidator().validate(ctx)
  const token = generateToken(1, 2)
  ctx.body = { name: 'chentian', age: 20, token }
})

module.exports = router
