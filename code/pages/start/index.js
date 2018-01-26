// pages/start/index.js
const app = getApp()
import request, {login, updateToken, saveToken} from '../../utils/net.js'
import {msgs, apis, getBaseURL} from '../../utils/config';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      index: 1,
      useInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let userInfo = app.globalData.userInfo
      console.log(userInfo)
      this.setData({
          userInfo
      })
      console.log(options)
      request({
          url: apis.postCardList,
          method: 'post',
          data: {
              gameId: options.gameId,
              type: 'left'
          }
      }).then(res => {

      })
  },
    change(e){
        console.log(e)
        this.setData({
            index: e.target.dataset.index
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})