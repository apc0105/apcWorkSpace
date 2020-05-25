import PreviewFormPanel from '@/form-design/preview-form-panel'
import PreviewMobilePanel from '@/form-design/preview-mobile-panel'
import ControlWidgetPanel from './control-widget-panel'
import { MessageBox } from 'element-ui'

export default {
  name: 'form-design-control-panel',
  components: { PreviewFormPanel, PreviewMobilePanel, ControlWidgetPanel },
  directives: {},
  mixins: [],
  props: {
    value: Object
  },
  data() {
    return {
      dialogVisible: false,
      previewMobile: null,
      formData: {},
      activeTab: 'basic'
    }
  },
  computed: {
    json() {
      return this.value
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    clearJson() {
      this.$emit('input', { config: this.value.config, elements: [] })
    },
    preview(previewMobile) {
      this.dialogVisible = true
      this.previewMobile = previewMobile
    },
    closePreview() {
      this.dialogVisible = false
      this.previewMobile = false
    },
    confirm() {
      MessageBox.alert(this.formData)
    }
  }
}
