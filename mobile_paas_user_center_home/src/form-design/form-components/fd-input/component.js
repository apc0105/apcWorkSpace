import FdFormItem from '../fd-form-item'
import accounting from 'accounting'
import FdControlMixins from '../fd-control-mixin'
import { str2number } from '@/form-design/utils/stringUtils'
export default {
  name: 'fd-input',
  components: { FdFormItem },
  mixins: [FdControlMixins],
  props: {
    value: [String, Number]
  },
  data() {
    return {
      showThousandth: true
    }
  },
  computed: {
    formatValue() {
      let val = this.stateValue
      if (this.isEmpty(val)) {
        return val
      }

      if (this.data.prefixFormat || this.data.suffixFormat) {
        val = this.replaceFormat(val, this.data.prefixFormat)
        val = this.replaceFormat(val, this.data.suffixFormat)
      }

      // 判断千分位
      if (this.data.number == 1 && this.showThousandth && this.stateValue) {
        val = accounting.unformat(val)
        val = this.getFormat(val)
      }
      return val
    },
    suffix() {
      return this.i18n(this.data.suffix) || this.data.suffixFormat
    },
    prefix() {
      return this.i18n(this.data.prefix) || this.data.prefixFormat
    },
    digit() {
      return this.data.digit || 0
    }
  },
  methods: {
    replaceFormat(val, format) {
      if (format) {
        if (typeof val !== 'string') {
          val = new String(val)
        }
        if (format == '%') {
          const str = val.replace(format, '')
          const num = str2number(str, this.data.digit)
          return num
        } else {
          return val.replace(format, '')
        }
      } else {
        return val
      }
    },
    appendFormat(val, format) {
      if (format) {
        if (format == '%') {
          const num = val
          // num = num / 100
          return num + format
        } else {
          return val + format
        }
      } else {
        return val
      }
    },
    prependFormat(val, format) {
      if (format) {
        return format + val
      } else {
        return val
      }
    },
    _input(e) {
      let val = e
      if (!this.isEmpty(val)) {
        if (this.data.number == 1 && val != '-') {
          val = str2number(val, this.data.digit)
        }
        val = this.appendFormat(val, this.data.suffixFormat)
        val = this.prependFormat(val, this.data.prefixFormat)
      }
      this.input(val)
    },
    _focus() {
      this.showThousandth = false
    },
    _blur() {
      this.showThousandth = true
    },
    getFormat(val) {
      const result = accounting.formatNumber(val, this.digit)
      return result
    }
  }
}
