import { HTTP } from '../util/http.js'

/**
 * @param ClassicModels: 异步请求, 便于前端测试
 * @param getLatest: 获取流行页面数据
 */
class ClassicModels extends HTTP {
  getLatest () {
    return this.request({
      url: '/classic/latest'
    })
  }
}

export { ClassicModels }