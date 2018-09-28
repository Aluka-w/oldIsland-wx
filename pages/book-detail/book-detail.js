// pages/book-detail/book-detail.js
import BookModel from '../../models/book';
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('跳转过来的', options)
    const id = options.id
    const detail = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    detail.then(res => {
      this.setData({
        detail: res
      })
    })
    comments.then(res => {
      this.setData({
        comments: res.comments
      })
    })
    likeStatus.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    }, () => {
      console.log(this.data)
    })
  }
})