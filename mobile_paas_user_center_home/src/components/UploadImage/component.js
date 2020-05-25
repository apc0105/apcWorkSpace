import { checkResponse, getHeader } from '@/utils/flowrRequest';
export default{
  name: 'upload-image',
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    field: String,
    type: {
      type: String,
      default: 'square' // square,rectangle
    },
    value: String,
    busId: [String, Number],
    module: String,
    showInput: {
      type: Boolean,
      default: true
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonSize: {
      type: String,
      default: 'mini'
    },
    width: [String, Number],
    height: [String, Number],
    placeholder: String
  },
  computed: {
    src() {
      return this.data ? this.data[this.field] : this.value
    },
    disabled() {
      if (this.src || this.value) {
        return true
      }
      return false
    },
    uploadUrl() {
      return process.env.BASE_API + '/file/upload/file'
    },
    uploadHeader() {
      return getHeader()
    },
    uplodateData() {
      const data = this.data || {}
      const busId = data.id || this.busId
      return { busId: busId || '', module: this.module }
    },
    className() {
      if (this.type == 'square') {
        return 'upload-box-square'
      } else {
        return 'upload-box-rectangle'
      }
    },
    sizeStyle() {
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (this.height) {
        style.height = this.height + 'px'
      }
      return style
    },
    iconSizeStyle() {
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (this.height) {
        style.height = this.height + 'px'
        style.lineHeight = this.height + 'px'
      }
      return style
    },
    imageSizeStyle() {
      const style = {}
      if (this.width) {
        style.maxWidth = (this.width - 2) + 'px'
      }
      if (this.height) {
        style.maxHeight = (this.height - 2) + 'px'
      }
      return style
    },
    tipText() {
      if (this.placeholder) {
        return this.placeholder
      }
      if (this.type == 'square') {
        return '建议尺寸1:1的JPG/PNG'
      } else {
        return '建议尺寸2:1的JPG/PNG'
      }
    }
  },
  methods: {
    uploadSuccess(res, file) {
      if (checkResponse(res)) {
        const src = res.content.url
        this.input(src)
      } else {
        this.$emit('failed', res)
      }
    },
    clear() {
      this.$emit('clear')
      this.$emit('input')
      if (this.data && this.field) {
        this.data[this.field] = null
      }
    },
    input(e) {
      this.$emit('success', e)
      this.$emit('input', e)
      if (this.data && this.field) {
        this.data[this.field] = e
      }
    },
    check(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/svg+xml'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('只能是 JPG / PNG / SVG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('素材大小不能超过 2MB!')
      }
      const result = isJPG && isLt2M
      return result
    }
  }
}
