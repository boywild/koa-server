const Router = require('@koa/router')

const router = new Router({ prefix: '/v1/book' })

router.get('/hot_list', async (ctx) => {
  ctx.body = {
    name: '测试书',
    price: 12
  }
})

module.exports = router
