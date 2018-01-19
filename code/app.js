//app.js
import request, {login} from './utils/net.js'
import {apis} from './utils/config.js'

App({
  onLaunch: function () {
    // 展示本地存储能力

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     request({
    //         url: apis.getLogin,
    //         method: 'post',
    //         token: false,
    //         data: {
    //             code: res.code,
    //             appKey: 'kaixinlesong',
    //             version: '1.0.0'
    //
    //         }
    //     }).then(r => {
    //         let result = {
    //             "token": "wxlg_5383ed43120649c5898bb8ac1d691f99",
    //             "user": {
    //                 "openId": "ogXY_t---PM9RkygTk6BFDDi10mQ"
    //             }
    //         }
    //         console.log('result', r)
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              login().then(data => {
                console.log(data)
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // userInfo: null
    userInfo: {
        nickName: "Lemon～～",
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/1kBf4gwxfDE3Z8icJRaZ02iajXA0WVEI5Mib4NmE3wunNoodPNLC2Ipf3lxlLwT3AticUQtYFr6SP5HmW2rJ878DOg/0"
    }
  }
})