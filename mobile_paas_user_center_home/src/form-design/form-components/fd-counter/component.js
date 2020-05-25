import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import { str2number } from '@/form-design/utils/stringUtils'
export default {
  name: 'fd-counter',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {
    formatValue(){
      let val = this.value
      if (this.isEmpty(val)) {
        return val
      }
      if (this.data.prefixFormat || this.data.suffixFormat) {
        val = this.replaceFormat(val, this.data.prefixFormat)
        val = this.replaceFormat(val, this.data.suffixFormat)
      }
      return val
    },
    suffix(){
      return this.data.suffix || this.data.suffixFormat
    },
    prefix(){
      return this.data.prefix || this.data.prefixFormat
    },
  },
  methods: {
    replaceFormat(val, format){
      if (format) {
        if (format == '%') {
          const str = val.format(format)
          const num = str2number(str,this.data.digit)
          return num * 100
        } else {
          return val.format(format)
        }
      } else {
        return val
      }
    },
  },
}
