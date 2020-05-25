import PreviewFormPanel from '@/form-design/preview-form-panel'
import PreviewMobilePanel from '@/form-design/preview-mobile-panel'
import { MessageBox } from 'element-ui'
export default {
  name: 'form-design-tool-panel',
  components: { PreviewFormPanel, PreviewMobilePanel },
  directives: {},
  mixins: [],
  props: {
    value: Object
  },
  data() {
    return {
      dialogVisible: false,
      previewMobile: false,
      previewPc: false,
      formData: {}
    }
  },
  computed: {
    json() {
      return this.value
    },
    dialogWidth() {
      let width = Number.parseFloat(this.json.config.formWidth)
      width = Number.isNaN(width) ? 800 : width
      return (width + 40) + 'px'
    }
  },
  created() {
    this.init()
    console.log(this.value)
    console.log(this.formData)
  },
  methods: {
    init() {
    },
    clearJson() {
      // debugger
      this.$emit('input', { config: this.value.config, elements: [] })
    },
    preview() {
      this.previewPc = true
      this.previewMobile = false
    },
    previewPhone() {
      this.previewPc = false
      this.previewMobile = true
    },
    closePreview() {
      this.previewPc = false
      this.previewMobile = false
    },
    confirm() {
      this.$refs['designForm'].validate(valid => {
        if (valid) {
          this.closePreview()
          // MessageBox.alert(this.formData)
        }
      })
    }
  }
}
