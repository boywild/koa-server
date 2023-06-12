const util = require('util')
const axios = require('axios')
const { wx } = require('@/config')
const { AUTY_TYPE } = require('@/config/enum')
const User = require('@/model/user')
const { generateToken } = require('@/utils')

class Wx {
  // 微信api通过code获取哦openid
  static async codeToToken(code) {
    const url = util.format(wx.loginUrl, wx.appId, wx.appSecret, code)
    const { status, data } = await axios.get(url)
    if (status !== 200) {
      throw new global.err.AuthFailed('openid获取失败')
    }
    const { errcode, errmsg, openid } = data
    if (errcode) {
      throw new global.err.AuthFailed(`openid获取失败 ${errmsg}`)
    }

    let user = await User.getUserByOpenid(openid)
    if (!user || !user.id) {
      user = await User.registerByOpenid(openid)
    }

    return generateToken(user.id, AUTY_TYPE.USER)
  }
}

module.exports = Wx
