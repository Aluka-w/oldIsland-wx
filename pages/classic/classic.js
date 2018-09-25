import { ClassicModels } from '../../models/classic.js'
let classic = new ClassicModels()
Page({
  data: {
    classicData: null
  },
  onLoad: function (options) {
    classic.getLatest()
    .then(res => {
      console.log(123, res)
      this.setData({
        classicData: res
      })
    })
  },
})