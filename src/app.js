const { resolve } = require('path')
require('module-alias/register')
const Koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const user = require('@/api/v1/user')
const exception = require('@/middleware/exception')

const app = new Koa()
app.use(serve(resolve(__dirname, './static')))
app.use(bodyParser())
app.use(exception)
app.use(user.routes())

app.listen(3009, () => {
  console.log('server listener at http://localhost:3009')
})
