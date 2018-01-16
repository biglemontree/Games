//index.js
//获取应用实例
const app = getApp()

import {apis} from '../../utils/config.js'
import {login} from '../../utils/net.js'
import request from '../../utils/net.js'
Page({
  data: {
      motto: 'Hello World',
      array: ['能找到这个福利算你赢', '中国', '巴西', '日本'],
    index: 0,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // request({
    //     // url: apis.getLogin
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data)
    // const ctx = wx.createCanvasContext('myCanvas')
    // ctx.setFillStyle('red')
    // ctx.fillRect(10, 10, 150, 75)
    //
    // ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    // ctx.draw()


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
