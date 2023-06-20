const Router = require('@koa/router')
const Auth = require('@/middleware/auth')

const router = new Router({ prefix: '/v1/like' })

// 点赞
router.post('/', new Auth(8).m(), async () => {})

// 取消点赞
router.post('/cancel', new Auth(8).m(), async () => {})

module.exports = router
