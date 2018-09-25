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
      let { like, count } = this.properties
      count = like ? count - 1 : count + 1
      like = ! like
      this.setData({
        like,
        count
      })
    }
  }

})