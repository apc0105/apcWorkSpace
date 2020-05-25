import eventbus from '@/form-design/utils/eventbus'
import FormControlPropsPanel from '@/form-design/props-panel/control-props-panel'
import FormFormPropsPanel from '@/form-design/props-panel/form-props-panel'

export default {
  name: 'form-props-panel',
  components: { FormControlPropsPanel, FormFormPropsPanel },
  props: {
    value: Object,
    formId: [String, Number]
  },
  data() {
    return {
      activeTab: 'form'
    }
  },
  computed: {
    json() {
      return this.value
    }
  },
  mounted() {
    eventbus.$on('activeFormElement', this.activeElement)
    eventbus.$on('activeFormConfig', this.activeConfig)
  },
  destroyed() {
    eventbus.$off('activeFormElement')
    eventbus.$off('activeFormConfig')
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // if (!this.formId) {
      //   return this.$notify({
      //     title: this.i18n('message.titles.warn'),
      //     message: this.i18n('message.flow.formdesign.noformId'),
      //     type: 'warning',
      //     duration: 2000
      //   })
      // }
    },
    activeElement(el) {
      this.activeTab = 'control'
    },
    activeConfig(el) {
      this.activeTab = 'form'
    },
    emitInput() {
      this.$emit('input', { ...this.json })
    }
  }
}
