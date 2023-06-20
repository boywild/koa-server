const Router = require('@koa/router')
const { generateToken } = require('@/utils/index')
const { LOGIN_TYPE, AUTY_TYPE } = require('@/config/enum')
const User = require('@/model/user')
const Wx = require('@/core/wx')
const Auth = require('@/middleware/auth')

const TokenValidator = require('@/validate/TokenValidator')
const NotEmptyValidator = require('@/validate/NotEmptyValidator')
// 邮箱登录
async function emailLogin(email, password) {
  const user = await User.verifyEmailPassword(email, password)
  return generateToken(user.id, AUTY_TYPE.USER)
}

// 小程序登录
async function miniProgramLogin(code) {
  const token = await Wx.codeToToken(code)
  return token
}

const router = new Router({ prefix: '/v1/token' })

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')
  let token = ''
  switch (type) {
    case LOGIN_TYPE.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.password'))
      break
    case LOGIN_TYPE.USER_MINI_PROGRAM:
      token = await miniProgramLogin(v.get('body.account'))
      break
    case LOGIN_TYPE.ADMIN_EMAIL:
      break
    default:
      throw new Error('2323')
  }

  ctx.body = { token }
})

// 验证token
router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const res = await Auth.verifyToken(v.get('body.token'))

  ctx.body = res
})

module.exports = router
