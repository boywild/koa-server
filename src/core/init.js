const path = require('path')
const Router = require('@koa/router')
const requireDirectory = require('require-directory')
class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouters()
  }

  //   自动加载配置
  static loadConfig(path) {
    const configPath = path || `${process.cwd()}/src/config/config.js`
    const config = require(configPath)
    global.config = config
  }

  //   自动加载路由
  static initLoadRouters() {
    const apiDir = `${process.cwd()}/src/app/api`
    requireDirectory(module, apiDir, {
      visit: function (obj) {
        console.log(obj instanceof Router)
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }
}

module.exports = InitManager
