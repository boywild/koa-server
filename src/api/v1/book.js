const Router = require('@koa/router')
const Auth = require('@/middleware/auth')

const router = new Router({ prefix: '/v1/book' })

router.get('/hot_list', new Auth(8).m(), async (ctx) => {
  ctx.body = {
    name: '测试书',
    price: 12
  }
})

module.exports = router
