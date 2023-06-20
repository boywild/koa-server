const Router = require('@koa/router')
// const Auth = require('@/middleware/auth')

// const { AUTY_TYPE } = require('@/config/enum')
const Flow = require('@/model/flow')
const Art = require('@/model/art')

const router = new Router({ prefix: '/v1/art' })

// 最新期刊
router.get('/latest', async (ctx) => {
  const flow = await Flow.findOne({ order: [['index', 'DESC']] })
  const art = await Art.getData(flow.art_id, flow.type)
  //   console.log(flow)
  ctx.body = art || {}
})

// 期刊详情
router.get('/:type/:id', () => {})

// 期刊点赞数
router.get('/:type/:id/favor', () => {})

// 我的点赞
router.get('/fav', () => {})

module.exports = router
