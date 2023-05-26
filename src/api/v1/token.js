const Router = require('@koa/router')
const { generateToken } = require('@/utils/index')
const TokenValidator = require('@/validate/TokenValidator')
const { LOGIN_TYPE, AUTY_TYPE } = require('@/config/enum')
const User = require('@/model/user')

async function emailLogin(email, password) {
  const user = await User.verifyEmailPassword(email, password)
  return generateToken(user.id, AUTY_TYPE.USER)
}
function miniProgramLogin() {}

const router = new Router({ prefix: '/v1/token' })

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')
  let token = ''
  switch (type) {
    case LOGIN_TYPE.USER_EMAIL:
      token = await emailLogin(v.get('body.email'), v.get('body.password'))
      break
    case LOGIN_TYPE.USER_MINI_PROGRAM:
      token = await miniProgramLogin()
      break
    case LOGIN_TYPE.ADMIN_EMAIL:
      break
    default:
      throw new Error('2323')
  }

  ctx.body = { token }
})

module.exports = router
