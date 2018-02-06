// pages/start/index.js
const app = getApp()
import request, {login, updateToken, saveToken} from '../../utils/net.js'
import {msgs, apis, getBaseURL} from '../../utils/config';

let data = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]
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
          method: 'post',
        //   {
        //     gameId: '2332dcf53d624ea98d013e5a7dcf69b0'
        //   }
      }).then(r => {
         this.setData({
             detail: r
         })
      })
      this.getLogo()

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
  touch(e) {
      console.log(e, 'ddd');
  },
  giveup(e) {
      console.log(e);

  },
  draw(logo) {
      const ctx = wx.createCanvasContext('myCanvas')
      // ctx.setFillStyle('red')
      ctx.fillRect(10, 60, 63*5, 63*5)

      // ctx.drawImage(this.data.logo, 0, 0, 150, 100)
      console.log(logo);
      data.forEach((current, i) => {
          current.forEach((item, j) => {

              ctx.drawImage(logo, 63*i+8, 63*j+8, 63, 63)
              ctx.moveTo(63*i+8, 63*j+8)
          })
      })

      ctx.rotate(180*Math.PI/180)
      // ctx.drawImage(logo, 0, 63, 63, 63)
      ctx.draw()
  },
  getLogo() {
    request({
      url: apis.postLogo,
      method: 'post',
    }).then(r => {
      this.setData({
        logo: r[0]
      })
      // this.draw(r[0])
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
