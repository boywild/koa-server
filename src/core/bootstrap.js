const requireDirectory = require('require-directory')
const config = require('@/config')
const exception = require('@/core/httpException')

// 挂载系统配置
function loadConfig() {
  global.config = config
}

// 自动挂载路由
function loadRouter(app) {
  const visitor = (obj) => {
    app.use(obj.routes())
    app.use(obj.allowedMethods())
  }
  requireDirectory(module, `${process.cwd()}/src/api/v1`, { visit: visitor })
}

// 挂载异常生成器
function loadExecption() {
  global.err = exception
}

function bootstrap(app) {
  loadConfig()
  loadRouter(app)
  loadExecption()
}

module.exports = bootstrap
