import { ClassicModels } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModels = new ClassicModels()
let likeModel = new LikeModel()
Page({
  data: {
    classicData: null
  },
  onLoad: function (options) {
    classicModels.getLatest()
    .then(res => {
      console.log(123, res)
      this.setData({
        classicData: res
      })
    })
  },
  onLike (e) {
    const { classicData } = this.data
    let behavior = e.detail.behavior
    likeModel.like(behavior, classicData.id, classicData.type)
  }
})