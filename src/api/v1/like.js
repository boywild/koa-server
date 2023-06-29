const Router = require('@koa/router')
const Auth = require('@/middleware/auth')
const { AUTY_TYPE } = require('@/config/enum')
const LikeValidator = require('@/validate/LikeValidator')
const Favor = require('@/model/favor')

const router = new Router({ prefix: '/v1/like' })

// 点赞
router.post('/', new Auth(AUTY_TYPE.USER).m(), async (ctx) => {
  const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
  const type = v.get('body.type')
  const artId = v.get('body.art_id')
  await Favor.like(artId, type, ctx.auth.uid)
  throw new global.err.Success('点赞成功')
})

// 取消点赞
router.post('/cancel', new Auth(AUTY_TYPE.USER).m(), async (ctx) => {
  const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
  const type = v.get('body.type')
  const artId = v.get('body.art_id')
  await Favor.dislike(artId, type, ctx.auth.uid)
  throw new global.err.Success('取消点赞成功')
})

module.exports = router
