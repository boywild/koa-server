const Router = require('@koa/router')
const router = new Router()

router.get('/auth/login', (ctx, next) => {
  ctx.body = { name: 'authLogin' }
})

module.exports = router
