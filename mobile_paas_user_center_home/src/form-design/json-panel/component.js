import JsonEditor from '@/components/JsonEditor'
import FormConfig from '@/form-design/form-props/form-config'

const EMPTY_JSON = {
  config: FormConfig.defaultValue(),
  elements: []
}

export default {
  name: 'form-json-panel',
  props: {
    value: Object
  },
  components: { JsonEditor },
  watch: {
    value(val) {
      this.initJson(val)
    }
  },
  data() {
    return {
      jsonValue: undefined
    }
  },
  created() {
    this.initJson(this.value)
  },
  methods: {
    initJson(json) {
      this.jsonValue = { ...json }
    },
    importJson() {
      try {
        let value = this.jsonValue
        if (value == null || value == undefined) {
          value = { ...EMPTY_JSON }
        }
        if (typeof value === 'string') {
          if (value.trim() == '') {
            value = { ...EMPTY_JSON }
          } else {
            value = JSON.parse(this.jsonValue)
          }
        }
        this.$emit('input', value)
      } catch (e) {
        console.warn(e)
        this.$notify({
          title: '提示',
          message: 'Json格式错误',
          type: 'error',
          duration: 2000
        })
      }
    }
  }
}
