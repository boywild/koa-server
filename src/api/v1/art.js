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
router.get('/:index/prev', new Auth().m(), async (ctx) => {
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
router.get('/:type/:id', new Auth().m(), async (ctx) => {
  const v = await new ArtValidator().validate(ctx)
  const type = v.get('path.type')
  const id = v.get('path.id')

  const art = await Art.getDetail(id, type, (ctx.auth && ctx.auth.uid) || '')
  ctx.body = art || {}
})

// 期刊点赞数
router.get('/:type/:id/favor', new Auth().m(), async (ctx) => {
  const v = await new ArtValidator().validate(ctx)
  const type = v.get('path.type')
  const id = v.get('path.id')

  const art = await Art.getDetail(id, type, (ctx.auth && ctx.auth.uid) || '')
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: art.like_status
  }
})

// 我点赞的期刊
router.get('/favor', new Auth().m(), async (ctx) => {
  const favor = await Favor.findAll({ where: { user_id: ctx.auth.uid } })
  if (!favor.length) {
    throw new global.err.NotFound()
  }
  const arts = await Art.getList(favor)
  ctx.body = arts
})

module.exports = router
