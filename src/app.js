const { resolve } = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const user = require('./api/v1/user')
const exception = require('./middleware/exception')

const app = new Koa()
app.use(serve(resolve(__dirname, './static')))
app.use(user.routes())
app.use(exception())
app.listen(3009, () => {
  console.log('server listener at http://localhost:3009')
})
