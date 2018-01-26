const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showToast(title, icon){
    wx.hideToast()
    wx.showToast({
        title: title,
        icon: icon,
        duration: 1000,
        mask: true,
    })
}

/**
 * 模态框
 * @param {*标题} title
 * @param {*提示内容} content
 */
const showModal = (title, content) => {
    return new Promise((reslove, reject) => {
        wx.showModal({
            title,
            content,
            showCancel: false,
            success: reslove
        })
    })
}

module.exports = {
  formatTime, showToast, showModal
}
