App({
  onLaunch: function (options) {
    // console.log('第一次进入项目', options)
  },
  onShow: function (options) {
    // console.log('从后台进入', options)
  },
  onHide: function () {
    // console.log('进入后台', this.globalData)
  },
  onError: function (msg) {
    // console.log('failed', msg)
  },
  globalData: 'I am global data',
  initData: 1
})