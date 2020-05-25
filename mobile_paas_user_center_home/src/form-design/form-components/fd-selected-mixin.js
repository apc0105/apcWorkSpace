import { getList, getRemote } from '@/api/system/dict'

export default {
  props: {
    data: Object,
    value: [String, Number, Array, Object, Boolean, Date, Symbol]
  },
  watch: {
    data(val) {
      this.initOptions()
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      error: false,
      valueProp: 'key',
      labelProp: 'label'
    }
  },
  created() {
    this.initOptions()
  },
  mounted() {
  },
  computed: {
    disabled() {
      return this.data.disabled === 1 || this.data.readonly === 1
    },
    itemStyle() {
      const style = []
      if (this.data.itemBtnRow === 1) {
        style.push('display:block')
      }
      style.push('line-height:' + this.sizeHeight + 'px')
      return style.join(';')
    }
  },
  methods: {
    initOptions() {
      if (this.data.enums) {
        this.initKeyValueLabel()
        const enums = this.data.enums.replace(RegExp('，', 'g'), ',')
        return this.setOptions(enums.split(','))
      } else if (this.data.dict) {
        this.initDictKeyValueLabel()
        this.loadDictOptions(this.data.dict.name)
      } else if (this.data.remoteUrl) {
        this.initDictKeyValueLabel()
        this.loadApiOptions(getRemote(this.data.remoteUrl), {})
      } else if (this.data.options && this.data.options.length > 0) {
        this.initKeyValueLabel()
        return this.setOptions(this.data.options)
      }
    },
    initKeyValueLabel() {
      this.valueProp = this.data.valueProp
      this.labelProp = this.data.labelProp
    },
    initDictKeyValueLabel() {
      // this.valueProp = 'value'
      // this.labelProp = 'label'
      this.valueProp = this.data.valueProp
      this.labelProp = this.data.labelProp
    },
    setOptions(options) {
      this.options = options
    },
    optionKey(item) {
      return this.optionValue(item)
    },
    optionLabel(item) {
      if (typeof item === 'number' || typeof item === 'string') {
        return item
      }
      const label = item[this.labelProp || 'name']
      return this.i18n(label)
    },
    optionValue(item) {
      if (typeof item === 'number' || typeof item === 'string') {
        return item
      }
      const val = item[this.valueProp || 'id']
      return val
    },
    loadDictOptions(type) {
      this.loadApiOptions(getList, type)
    },
    loadApiOptions(api, params) {
      this.loading = true
      this.error = false
      api(params).then(data => {
        this.loading = false
        if (data.code === 200) {
          this.options = data.data
        }
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    }
  }
}
