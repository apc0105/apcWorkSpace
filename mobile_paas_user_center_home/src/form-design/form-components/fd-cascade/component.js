import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import FdSelectedMixins from '../fd-selected-mixin'
import FdSelectPure from '../fd-select-pure'
import PlaceHolderSelect from '@/components/PlaceHolderSelect'

export default {
  name: 'fd-cascade',
  components: { FdSelectPure, PlaceHolderSelect, FdFormItem },
  mixins: [FdControlMixins, FdSelectedMixins],
  props: {
    value: Array
  },
  computed: {
    values() {
      if (Array.isArray(this.value)) {
        return this.value
      } else {
        return this.initDefaultValue()
      }
    },
    value1() {
      return this.values.length > 0 ? this.values[0] : null
    },
    value2() {
      return this.values.length > 1 ? this.values[1] : null
    },
    value3() {
      return this.values.length > 2 ? this.values[2] : null
    },
    data2() {
      const pid = this.value1
      if (this.isEmpty(pid)) {
        return { readonly: this.data.readonly }
      }
      const data2 = { ...this.data }
      delete data2.options
      delete data2.dict
      delete data2.remoteUrl
      delete data2.enums
      if (this.data.remoteUrl && this.data.remoteAsync === 1) {
        const c = this.data.remoteUrl.indexOf('?') > 0 ? '?' : '&'
        data2.remoteUrl = this.data.remoteUrl + c + 'level=2&parentId=' + pid
      } else {
        data2.options = this.getChildrenOptions(this.options, pid)
      }
      this.options2 = data2.options
      return data2
    },
    data3() {
      const pid = this.value2
      if (this.isEmpty(pid)) {
        return { readonly: this.data.readonly }
      }
      const data3 = { ...this.data }
      delete data3.options
      delete data3.dict
      delete data3.remoteUrl
      delete data3.enums
      if (this.data.remoteUrl && this.data.remoteAsync === 1) {
        const c = this.data.remoteUrl.indexOf('?') > 0 ? '?' : '&'
        data3.remoteUrl = this.data.remoteUrl + c + 'level=3&parentId=' + pid
      } else {
        data3.options = this.getChildrenOptions(this.options2, pid)
      }
      this.options3 = data3.options
      return data3
    }

  },
  data() {
    return {
      options1: [],
      options2: [],
      options3: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    initDefaultValue() {
      return [null, null, null]
    },
    input1(e) {
      this.input([e, null, null])
    },
    input2(e) {
      const value = this.values
      this.input([value[0], e, null])
    },
    input3(e) {
      const value = this.values
      this.input([value[0], value[1], e])
    },
    getChildrenOptions(options, pid) {
      if (Array.isArray(options)) {
        const items = options.filter(item => item[this.data.valueProp] === pid)
        if (items.length > 0) {
          return items[0].childrens || items[0].children || []
        }
      }
      return []
    }
  }
}

