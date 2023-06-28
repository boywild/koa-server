const Router = require('@koa/router')
const { PositiveIntegerValidator } = require('@/validate')
const ArtValidator = require('@/validate/ArtValidator')
const Auth = require('@/middleware/auth')
const Flow = require('@/model/flow')
const Favor = require('@/model/favor')
const Art = require('@/model/art')

const router = new Router({ prefix: '/v1/art' })

// 最新期刊
router.get('/latest', new Auth().m(), async (ctx) => {
  const flow = await Flow.findOne({ order: [['index', 'DESC']] })
  const art = await Art.getData(flow.art_id, flow.type)
  art.dataValues.index = flow.index
  if (ctx.auth && ctx.auth.uid) {
    const isFavor = await Favor.userLikeIt(ctx.auth.uid, flow.art_id, flow.type)
    art.dataValues.like_status = isFavor
  } else {
    art.dataValues.like_status = false
  }

  ctx.body = art || {}
})

// 下一期
router.get('/:index/next', new Auth().m(), async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const index = v.get('path.index')
  const flow = await Flow.findOne({ where: { index: index + 1 } })
  if (!flow) {
    throw new global.err.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)

  art.dataValues.index = flow.index
  if (ctx.auth && ctx.auth.uid) {
    const isFavor = await Favor.userLikeIt(ctx.auth.uid, flow.art_id, flow.type)
    art.dataValues.like_status = isFavor
  } else {
    art.dataValues.like_status = false
  }

  ctx.body = art || {}
})

// 上一期
router.get('/:index/prev', async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const index = v.get('path.index')
  const flow = await Flow.findOne({ where: { index: index - 1 } })
  if (!flow) {
    throw new global.err.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  art.dataValues.index = flow.index
  if (ctx.auth && ctx.auth.uid) {
    const isFavor = await Favor.userLikeIt(ctx.auth.uid, flow.art_id, flow.type)
    art.dataValues.like_status = isFavor
  } else {
    art.dataValues.like_status = false
  }
  ctx.body = art || {}
})

// 期刊详情
router.get('/:type/:id', async (ctx) => {
  const v = await new ArtValidator().validate(ctx)
  const type = v.get('path.type')
  const id = v.get('path.id')
  const art = await Art.getData(id, type)
  if (ctx.auth && ctx.auth.uid) {
    const isFavor = await Favor.userLikeIt(ctx.auth.uid, id, type)
    art.dataValues.like_status = isFavor
  } else {
    art.dataValues.like_status = false
  }
  ctx.body = art || {}
})

// 期刊点赞数
router.get('/:type/:id/favor', () => {})

// 我的点赞
router.get('/fav', () => {})

module.exports = router
