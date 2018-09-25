// components/epsoide/index.js
Component({
  properties: {
    index: {
      type: String,
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal > 10 ? newVal : '0' + newVal
        this.setData({
          _index: val
        }) 
      }
    }
  },
  data: {
    year: '2018',
    month: '七月',
    _index: ''
  },
  attached: function () {
    let year = new Date().getFullYear()
    let monthArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    let month = monthArr[new Date().getMonth()] + '月'
    this.setData({
      year,
      month
    })
  },
  methods: {

  }
})
