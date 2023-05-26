module.exports = {
  ENV: 'dev',
  port: '3000',
  database: {
    name: 'test',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456'
  },
  security: {
    key: 'abcdefg',
    expire: 7 * 24 * 60 * 60 * 1000
  },
  wx: {
    appId: 'wx6fbe5633d89cd6ef',
    appSecret: 'c0991ff4e6cbe2712a89d424b6e5be54',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
