const Router = require('@koa/router')
const { generateToken } = require('@/utils/index')
const TokenValidator = require('@/validate/TokenValidator')
const LOGIN_TYPE = require('@/config/enum')
// const User = require('@/model/user')

function emailLogin() {
  // 校验email是否有效
  // 校验密码是否输入错误
  return generateToken(1, 2)
}
function miniProgramLogin() {}

const router = new Router({ prefix: '/v1/token' })

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')
  let token = ''
  switch (type) {
    case type === LOGIN_TYPE.USER_EMAIL:
      token = await emailLogin()
      break
    case type === LOGIN_TYPE.USER_MINI_PROGRAM:
      token = await miniProgramLogin()
      break
    case type === LOGIN_TYPE.ADMIN_EMAIL:
      break
    default:
      throw new Error('2323')
  }

  ctx.body = { token }
})

module.exports = router
