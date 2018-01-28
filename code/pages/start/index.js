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
      useInfo: null,
      detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let userInfo = app.globalData.userInfo
    //   console.log(userInfo)
      this.setData({
          userInfo,
          gameId: options.gameId
      })
      request({
          url: apis.postDetail,
          data: options,
        //   {
        //     gameId: '2332dcf53d624ea98d013e5a7dcf69b0'
        //   }
      }).then(r => {
         this.setData({
             detail: r
         })   
      })
      console.log(options)
    //   request({
    //       url: apis.postCardList,
    //       method: 'post',
    //       data: {
    //           gameId: options.gameId,
    //           type: 'left'
    //       }
    //   }).then(res => {

    //   })
  },
  share(){
      const {nickname, playWord} = this.data.detail
    request({
        url: apis.postAcode,
        method: 'post',
        data: {
            gameId: this.data.gameId
        }
    }).then(r => {
        wx.navigateTo({
            url: `../share/index?url=${r.url}&nickname=${nickname}&playWord=${playWord}`
        })
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