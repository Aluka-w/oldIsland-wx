Component({
  behaviors: [],
  properties: {
    like: {
      type: Boolean,
      value: false,
      observer: function () {

      }
    },
    count: {
      type: Number
    }
  },
  data: {
    yesLike: '../images/heart.png',
    noLike: '../images/noheart.png'
  }, 

  methods: {
    onLike: function () {
      // 自定义事件
      let { like, count } = this.properties
      count = like ? count - 1 : count + 1
      like = !like
      this.setData({
        like,
        count
      })
      // triggerEvent, 激活自定义事件
      let behavior = like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      },{})
    }
  }

})