//版本
const version = '0.0.0';


//文本信息
const msgs = {
    0: '提示',
    //当返回的res是undefined
    1: 'oops!',
    //'request fail',//通信或微信请求api报错
    2: '来自微信的通信错误',
    //'login fail',//登录报错
    3: '来自微信的登录错误',
    //'setStorage fail',//写入本地缓存报错
    4: '来自微信的储存错误',
    //'fetch fail',//接口报错
    5: '来自服务器的接口错误',
    //网络不通
    6: '当前网络不通。',
    7: '加载中',
    8: '不能为空',
    9: '新增成功',
    10: '抬头储存上限是5个哦，清理一下空间再添加新抬头吧。',
    11: '删除成功',
    12: '修改成功',
    13: '我分享了一个发票抬头信息给你，请惠存。',
    14: '您已添加了相同名称的抬头信息，是否重复添加？',
    15: '不能识别此二维码',
    0:	'正确响应',
    '-1':	'系统繁忙，请稍后再试',
    40001:	'缺少参数/参数有误',
    40002:	'尚未登录/会话超时',
    40100:	'不支持的小程序',
    40801:	'支付方式不支持',
};

const baseURLs = [
    {
        text: '抬头管理',
        name: 'title',
        urls: [
            'https://wxlg.01solomo.com/lg/',
            'https://titlemanage.yewifi.com']
    },

];


function getBaseURL(name) {
    //console.log('get base url');
    let names = baseURLs.map(item => item.name);
    if (names.indexOf(name) < 0) {
        throw new Error('name must one of ' + names.join('/'));
    }
    //默认使用测试服
    let url = baseURLs.find(item => item.name === name).urls[0];

    return url;
}


const apis = {
    //登录
    getLogin: 'user/on/login',
    postNewCard: 'guess/card/create',
    postSubmitCard: 'guess/card/submit'
};


export {
    msgs, apis, baseURLs, getBaseURL
}