const Koa = require('koa')
const KoaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const InitManager = require('./core/init')

const app = new Koa()

app.use(KoaStatic(__dirname + '/static'))
app.use(bodyParser())
InitManager.initCore(app)

app.listen(3001, () => {
  console.log('server listen at localhost:3001')
})
