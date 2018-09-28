import { HTTP } from "../util/http";

class BookModel extends HTTP {
  getHotList () {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getMyBookCount () {
    return this.request({
      url: '/book/favor/count'
    })
  }
  getDetail (id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }
  getLikeStatus (id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }
  getComments (id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }
}
export default BookModel