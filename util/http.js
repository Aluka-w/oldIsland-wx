import { Config } from '../config.js'

const tips = {
  1: '发生了未知错误',
  1005: '不正确的开发者key',
  1004: '禁止访问',
  3000: '该期内容不存在',
  1006: '服务器内部错误'
}
/**
 * @param request: 做了get, post, put的请求, 封装成promise
 * @param param: url, data, method
 * @param _showErr: 私有方法, 错误码提示
 */
export class HTTP {
  request (param) {
    if (!param.method) {
      param.method = 'GET'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: Config.BASE_URL + param.url,
        data: param.data,
        header: {
          "content-type": "application/json",
          "appkey": Config.appkey
        },
        method: param.method,
        // str.startWith() 判断是否以某个字符串开头
        success: (res) => {
          let statusCode = String(res.statusCode).startsWith('2')
          if (statusCode) {
            resolve(res.data)
          } else {
            this._showErr(res.data.error_code)
          }
        },
        fail: (err) => {
          this._showErr(err.data.error_code)
        }
      })
    })
  }
  // 根据错误码的不同, 展示不同的错误提示, 下划线代表私有方法
  _showErr (err) {
    if (!err) {
      err = 1
    }
    const tip = tips[err] ? tips[err] : tips[1]
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    })
  }
}