import { HTTP } from '../util/http.js'

/**
 * @param ClassicModels: 异步请求, 便于前端测试
 * @param getLatest: 获取流行页面数据
 * @param getClassic: 获取前一期或者后一期的数据
 * @param isFirst: 判断是不是第一期
 * @param setLatestIndex: 存储最后一期的index
 * @param _setKey: 为缓存做准备, 每个单独的key
 */
class ClassicModels extends HTTP {
  getLatest () {
    return this.request({
      url: '/classic/latest'
    })
  }
  getClassic (index, prevOrNext) {
    let key = prevOrNext==='next'? this._setKey(index + 1) : this._setKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      return this.request({
        url: `/classic/${index}/${prevOrNext}`
      })
      .then(res => {
        wx.setStorageSync(key, res)
        return res
      })
    } else {
      return new Promise((reslove, reject) => {
        reslove(classic)
      })
    }
  }
  isFirst (index) {
    return index === 1 ? true : false
  }
  isLatest (index) {
    let latestIndex = this._getLatestIndex()
    return index===latestIndex ? true : false
  }
  setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex () {
    return wx.getStorageSync('latest')
  }
  _setKey (index) {
    return 'classic' + index
  }
}

export { ClassicModels }