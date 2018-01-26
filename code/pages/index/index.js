//index.js
//获取应用实例
const app = getApp()

// import request, {login, updateToken, saveToken} from '../../utils/net.js'
import request, {login, updateToken, saveToken} from '../../utils/net.js'
import {msgs, apis, getBaseURL} from '../../utils/config';
import util from '../../utils/util'
Page({
    data: {

        wordArray: ['能找到这个福利算你赢', '中国', '巴西', '日本'],
        wordIndex: 0,
        hardLevel: ['简单', '正常', '困难', '变态'],
        activeIndex: 1,
        cardImage: '',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        accessToken: ''
    },
    //事件处理函数
    bindPickerChange: function (e) {
        console.log(e)
        this.setData({
            wordIndex: e.detail.value
        })
    },
    setting(e){
        let index = e.target.dataset.index
        this.setData({
            activeIndex: index
        })
    },
    // 获取翻牌游戏记录列表
    cardList() {

    },
    onLoad: function (options) {

        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    cardImage: res.userInfo.avatarUrl,
                    hasUserInfo: true
                })
                login().then(code => {
                    const { avatarUrl, gender, country, province, city, language } = res.userInfo
                    updateToken({
                        code,
                        appKey: 'kaixinlesong',
                        version: '1.0.0'
                    }, getBaseURL('title') + apis.getLogin).then(data => {
                        console.log('rr', data)
                        saveToken(data.token)
                    })
                })
            }
        })

        request({
            url: apis.postAccesstoken,
            method: 'post',
        }).then(r => {
            this.setData({
                accessToken: r.accessToken
            })
            wx.setStorage({
                key: "accessToken",
                data: r.accessToken
            });
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res.userInfo)
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

        // const ctx = wx.createCanvasContext('myCanvas')
        // ctx.setFillStyle('red')
        // ctx.fillRect(10, 10, 150, 75)
        //
        // ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
        // ctx.draw()


    },
    chooseImage(e){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                this.setData({
                    cardImage: res.tempFilePaths
                })
            }
        });
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    introduce(e) {
        util.showModal('玩法介绍', '你可以设置一个带奖励的翻牌PK, 好友挑战成功才能领到奖励 , 提示可以通过调节难度, 设置封面图来提高趣味性哦~')
    },
    formSubmit(e){ // create

        let value = e.detail.value
        const { playWord, money, number } = value
        const { wordArray, wordIndex, hardLevel, activeIndex, cardImage } = this.data
        if (!money || !number) {
            util.showToast('金额和数量不能为空')
            return
        }
        request({
            url: apis.postNewCard,
            method: 'post',
            data: {
                playWord, number,
                // hardLevel: hardLevel[activeIndex],
                money: 100 * money,
                hardLevel: 'normal',
                cardImage: cardImage
            }
        }).then(r => {

            wx.requestPayment({
                ...r,
                timeStamp: r.timestamp,
                'signType': 'MD5',
                'success': function (res) {
                    console.log('this.data.accessToken', this.data.accessToken)
                    // wx.request({
                    //     url: 'https://api.weixin.qq.com/wxa/getwxacode',
                    //     data: {
                    //         access_token: this.data.accessToken
                    //     },
                    //     success(res){
                    //         console.log(res)
                    //
                    //     }
                    // })
                },
                'fail': function (res) {
                }
            })
        })
    }
})
