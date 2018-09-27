// components/classic/music/index.js
import { classicBeh } from '../classic-behavior';
const mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [classicBeh],
  properties: {
    mySrc: String // 播放的音乐
  },
  data: {
    playing: false,
    pauseSrc: '../../images/music/music@pause.png',
    playSrc: '../../images/music/music@play.png'
  },
  attached () {
    this._recoverMusic()
    this._monitorSwitch()
  },
  methods: {
    triggerPlay () {
      if (this.data.playing) {
        this.setData({
          playing: false
        })
        mMgr.pause()
      } else {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.mySrc
        mMgr.title = "test"
      }
    },
    // 切换音乐的时候其他页面需要暂停
    _recoverMusic () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.mySrc) {
        this.setData({
          playing: true
        })
      }
    },
    // 监听总控开关
    _monitorSwitch () {
      mMgr.onPlay(() => {
        this._recoverMusic()
      })
      mMgr.onPause(() => {
        this._recoverMusic()
      })
      mMgr.onStop(() => {
        this._recoverMusic()
      })
      mMgr.onEnded(() => {
        this._recoverMusic()
      })
    }
  }
})
