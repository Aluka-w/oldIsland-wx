import { ClassicModels } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModels = new ClassicModels()
let likeModel = new LikeModel()
Page({
  data: {
    classicData: null,
    first: false,
    lastest: true,
    fav_nums: 0,
    like_status: false
  },
  // 初始化页面数据
  onLoad: function (options) {
    classicModels.getLatest()
    .then(res => {
      console.log(123, res)
      this.setData({
        classicData: res,
        fav_nums: res.fav_nums,
        like_status: res.like_status===0 ? false : true
      })
      classicModels.setLatestIndex(res.index)
    })
  },
  // 点击点赞, 添加点赞或者取消点赞
  onLike (e) {
    const { classicData } = this.data
    let behavior = e.detail.behavior
    likeModel.like(behavior, classicData.id, classicData.type)
  },
  onPrev: function () {
    this._getClassic('previous')
  },
  onNext: function () {
    this._getClassic('next')
  },
  // 请求期刊的方法抽取出来
  _getClassic (prevOrNext)  {
    const { index } = this.data.classicData
    // 判断是请求服务器还是读取缓存的数据
    classicModels.getClassic(index, prevOrNext)
    .then(res => {
      // 实时更新点赞数据
      this._getClassicLike(res.id, res.type)
      this.setData({
        classicData: res,
        first: classicModels.isFirst(res.index),
        lastest: classicModels.isLatest(res.index)
      })
    })
  },
  // 把点赞的数据抽取出来, 保证实时更新
  _getClassicLike (artId, category) {
    likeModel.getClassicLike(artId, category)
    .then(res => {
      this.setData({
        fav_nums: res.fav_nums,
        like_status: res.like_status===0 ? false : true
      })
    })
  }
})