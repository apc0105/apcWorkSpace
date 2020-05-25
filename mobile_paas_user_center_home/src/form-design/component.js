import components from './form-components'
import ControlPanel from './control-panel'
import DesignPanel from './design-panel'
import PropsPanel from './props-panel'
import defaultJson from './default.json'

export default {
  name: 'form-design',
  components: { ...components, PropsPanel, ControlPanel, DesignPanel },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    initData: {
      type: Object,
      default: () => {
      }
    },
    formId: [String, Number]
  },
  computed: {
    json() {
      // return this.value || defaultJson
      return this.value || this.initData || defaultJson
    }
  },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
    },
    emitInput(e) {
      this.$emit('input', e)
    },
    showJsonImport() {
      this.jsonDialogVisible = true
      this.jsonDialogTitle = this.i18n('operation.flow.formdesign.importjson')
      this.jsonDialogImport = true
    },
    showJsonExport() {
      this.jsonDialogVisible = true
      this.jsonDialogTitle = this.i18n('operation.flow.formdesign.exportjson')
      this.jsonDialogImport = false
    },
    closeJsonDialog() {
      this.jsonDialogVisible = false
    }
  }
}
