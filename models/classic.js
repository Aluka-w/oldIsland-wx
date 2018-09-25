import { HTTP } from '../util/http.js'

class ClassicModels extends HTTP {
  getLatest () {
    return this.request({
      url: '/classic/latest'
    })
  }
}

export { ClassicModels }