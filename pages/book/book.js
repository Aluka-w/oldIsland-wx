// pages/book/book.js
import BookModel from '../../models/book';
const bookModel = new BookModel()
Page({
  data: {
    bookList: []
  },
  onLoad: function (options) {
    bookModel.getHotList()
    .then(res => {
      console.log(456, res)
      this.setData({
        bookList: res
      })
    })
  }
})