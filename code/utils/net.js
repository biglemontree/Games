import {msgs, apis, getBaseURL} from './config';
import oa from './object-assign';
import Promise from './promise';
const app = getApp()
//是否加载中
let isLoading = false;
//默认的配置项
const defaultOption = {

    url: '/',

    //这里动态从本地储存中获取
    baseURL: getBaseURL('title'),

    //更新token的api
    loginURL: apis.getLogin,

    //是否携带token
    token: true,

    //token键名
    tokenKey: 'js_token',

    //token失效的状态码
    // invalidCodes: ['9001', '9000'],
    invalidCodes: ['40002'],

    //成功状态码
    successCodes: ['0', '200'],

    header: {
        "Content-Type": 'application/x-www-form-urlencoded'
        // "Content-Type": 'application/x-www-form-urlencoded'
    },
    data: {
        appKey: 'kaixinlesong',
        version: '1.0.0'
    },
    //加载开始
    onLoadStart: () => {
        //console.log('load start');
        if (wx.showLoading) wx.showLoading({title: msgs[7]});
    },
    //加载结束
    onLoadEnd: () => {
        if (wx.hideLoading) wx.hideLoading();
    },
    //会话
    onMessage: (msg, title) => {
        wx.showModal({
            content: msg || msgs[5],
            title: title || msgs[0],
            showCancel: false
        })
    },

    //特殊状态码处理
    ext: {
        codes: [],
        handle() {
        }
    }
};

/**
 * 请求一个接口，是wx.request的拓展。
 * @param opt
 * @returns {Promise}
 */
function request(opt) {

    if (!isLoading) defaultOption.onLoadStart();
    isLoading = true;
    let option = oa({}, defaultOption, opt);

    return checkNetwork().then(() => new Promise((resolve, reject) => {

        function handle(token, retry = true/*当token失效，是否重试*/) {
            if (option.token) {
                console.log('token: ', token)

                // option.url = option.baseURL + opt.url + '?' + option.tokenKey + '=' + token;
                option.data = {token, ...option.data,
                    appKey: 'kaixinlesong',
                        version: '1.0.0'
                }
                // option.url = option.baseURL + opt.url + '?' + option.tokenKey + '=' + 'wxlg_5383ed43120649c5898bb8ac1d691f99';
            }
            option.url = option.baseURL + opt.url;

            option.success = (res) => {
                console.log(res)
                if (option.ext.codes && option.ext.codes.indexOf(String(res.data.code)) >= 0) {
                    //如果匹配到自定义的状态码，将执行自定义的handle。
                    option.ext.handle();
                }else if (option.token && option.invalidCodes.indexOf(String(res.data.code)) >= 0 && retry) {
                    console.log('retry!!!');
                    let times = 3
                    setTimeout(() => {

                        //当token失效,重新获取,所以:1登录->2获取token->3保存token到本地->4再次请求接口
                        login().then(code => updateToken({ code, appKey: 'kaixinlesong',version: '1.0.0' }, option.baseURL + option.loginURL)).then(saveToken).then(handle);
                    }, 500)
                    
                }  else if (option.successCodes.indexOf(String(res.statusCode)) >= 0) {
                    resolve(res.data);
                } else {
                    //其他无法处理的状态码
                    option.onMessage(res.data.msg);
                    reject(res.data);
                }
            };
            option.fail = (res) => {
                option.onMessage(res.errMsg || msgs[2], 'wx.request.fail');
            };
            option.complete = () => {
                isLoading = false;
                setTimeout(() => {
                    //当一个request时结束不要立刻'onLoadEnd()',
                    //因为不确定是否紧接着还有一个，这里给予300ms等待。
                    if (!isLoading) option.onLoadEnd();
                }, 300)
            };

            wx.request(option);
        }
        console.log(wx.getStorageSync(option.tokenKey))
        handle(wx.getStorageSync(option.tokenKey) || 'unknown', true);
    }));
}

/**
 * 登录
 * @returns {Promise}
 */
function login() {

    return new Promise(resolve => {
        wx.login({
            success(res) {
                resolve(res.code);
            },
            fail(res) {
                defaultOption.onMessage(res.errMsg || msgs[3], 'wx.login.fail');
            },
            complete(e) {
                //console.log(e);
            }
        })
    })
}


/**
 * 重新获取Token
 * @param code
 * @param loginURL
 * @returns {Promise}
 */
function updateToken(data, loginURL) {
    return new Promise(resolve => {
        //console.log('code:',code);
        wx.request({
            url: loginURL,
            // method: 'POST',
            /*------------*/
            data: data,
            /*------------*/
            success(res) {
                console.log("token", res.data.token);
                // resolve(res.data.data);
                resolve(res.data.token);
            },
            fail(res) {
                defaultOption.onMessage(res.errMsg || msgs[2], 'wx.request.fail');
            }
        })
    })
}

/**
 * 更新token到storage
 * @param value
 */
function saveToken(value) {
    return new Promise(resolve => {
        wx.setStorage({
            key: defaultOption.tokenKey,
            data: value,
            success(res) {
                //console.log('重新保存了token);
                resolve(value);
            },
            fail(res) {
                defaultOption.onMessage(res.errMsg || msgs[4], 'wx.setStorage.fail');
            },
            complete() {
                //console.log('set storage complete');
            }
        })
    })
}

/**
 * 检查网络
 * @returns {Promise}
 */
function checkNetwork() {
    return new Promise(resolve => {
        wx.getNetworkType({
            success(res) {
                // 返回网络类型, 有效值：
                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                //var networkType = res.networkType
                //console.log(res.networkType);
                if (res.networkType !== 'none') {
                    resolve(res.networkType);
                } else {
                    isLoading = false;
                    defaultOption.onLoadEnd();
                    defaultOption.onMessage(msgs[6]);
                }
            }
        });
    })
}

export {login, updateToken, saveToken}

export default request;
