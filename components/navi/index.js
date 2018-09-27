Component({
  properties: {
    title: String,
    first: Boolean,
    lastest: Boolean
  },
  data: {
    leftSrc: '../images/movie/triangle@left.png',
    disLeftSrc: '../images/movie/triangle.dis@left.png',
    rightSrc: '../images/movie/triangle@right.png',
    disRightSrc: '../images/movie/triangle.dis@right.png'
  },
  methods: {
    onLeft (e) {
      if (!this.properties.lastest) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight (e) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
