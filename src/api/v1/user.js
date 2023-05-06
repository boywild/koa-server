const Router = require('@koa/router')
// const { generateToken } = require('@/utils/index')
const RegisterValidator = require('@/validate/RegisterValidator')
const Success = require('@/core/httpException/success')
const User = require('@/model/user')

const router = new Router({ prefix: '/v1/user' })

router.post('/registry', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = { nickname: v.get('body.nickname'), email: v.get('body.email'), password: v.get('body.password2'), open_id: '2323' }
  // const token = generateToken(1, 2)
  await User.create(user)
  throw new Success()
})

module.exports = router
