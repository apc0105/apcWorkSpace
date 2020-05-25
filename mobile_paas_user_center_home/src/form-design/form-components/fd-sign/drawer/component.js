export default {
  name: 'fd-sign-drawer',
  props: {
    value: String,
    width: Number,
    height: Number,
    lineWidth: Number
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      canvasMoveUse: false,
      empty: true
    }
  },
  watch: {
    value(val) {
      this.clear()
      if (val) {
        this.showSign(val)
      }
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = this.$refs.canvas// 指定canvas
      this.ctx = this.canvas.getContext('2d')// 设置2D渲染区域
      this.ctx.lineWidth = this.lineWidth// 设置线的宽度
      if (this.value) {
        this.showSign(this.value)
      }
    },
    showSign(src) {
      this.empty = false
      var img = new Image()
      img.src = src
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, this.width, this.height)
      }
      // if (img.width > this.width) {
      //   img.width = this.width
      // }
      // img.height = this.height
    },
    canvasDown(e) {
      this.canvasMoveUse = true
      this.ctx.beginPath()
      // 移动的起点
      this.ctx.moveTo(e.offsetX, e.offsetY)
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        this.ctx.lineTo(e.offsetX, e.offsetY)
        this.ctx.stroke()
        this.empty = false
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false
    },
    canvasLeave(e) {
      this.canvasMoveUse = false
    },
    clear() {
      this.empty = true
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    },
    getSign() {
      if (this.empty) {
        return null
      }
      return this.canvas.toDataURL()
    }
  }
}
