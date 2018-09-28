// components/book/index.js
Component({
  properties: {
    bookData: Object
  },
  data: {

  },
  methods: {
    onClick () {
      const { id } = this.properties.bookData 
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?id=${id}`
      })
    }
  }
})
