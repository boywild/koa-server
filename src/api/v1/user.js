const Router = require('@koa/router')
// const { generateToken } = require('@/utils/index')
const RegisterValidator = require('@/validate/RegisterValidator')
const Success = require('@/core/httpException/success')
const User = require('@/model/user')

const router = new Router({ prefix: '/v1/user' })

router.post('/registry', async (ctx) => {
  // ctx.router available
  console.log(ctx.request)
  const v = await new RegisterValidator().validate(ctx)
  const user = { nickname: v.get('body.nickname'), email: v.get('body.email') }
  // const token = generateToken(1, 2)
  // ctx.body = { nickname: v.get('body.nickname'), email: v.get('body.email'), token }
  await User.create(user)
  throw new Success()
})

module.exports = router
