// pages/cash/index.js
import request, {login, updateToken, saveToken} from '../../utils/net.js'
import {msgs, apis, getBaseURL} from '../../utils/config';
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    fee: 0,
    // money: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
        url: apis.postBalance
    }).then(r => {
        this.setData({
            balance: r.balance/100
        })
    })
  },
  calculateCost(e) {
    console.log(e)
      let money = 100*e.detail.value
      if(!money) return
    request({
        url: apis.postMoney,
        method: 'post',
        data: {
          money: money
        }
    }).then(r => {
      
      this.setData({
          fee: r.fee/100
      })
    })
  },
  getMoney() {
    this.setData({
        money: this.data.balance
    })
  },
  submit(e) {
    console.log()
    let money = e.detail.value.money
    let balance = this.data.balance
    // if(money>balance) {
    //     util.showToast('提现余额不足', 'none')
    //     return
    // }
    if(money<1.02) {
        util.showModal('提现金额不能少于1.02元（含手续费）')
        return
    }
    request({
        url: apis.postPocket,
        data: {
            money: 100*money
        }
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