import FdFormItem from '../fd-form-item'
import accounting from 'accounting'
import FdControlMixins from '../fd-control-mixin'
import { str2number, number2text, money2cny } from '@/form-design/utils/stringUtils'
export default {
  name: 'fd-number',
  components: { FdFormItem },
  mixins: [FdControlMixins],
  props: {
    value: [String, Number],
  },
  data(){
    return {
      showThousandth: true,
    }
  },
  computed: {
    formatValue(){
      let val = this.stateValue
      //判断千分位
      if (this.showThousandth) {
        val = this.getFormat(val)
      }
      return val
    },
    suffix(){
      return this.i18n(this.data.suffix) || this.data.suffixFormat
    },
    prefix(){
      return this.i18n(this.data.prefix) || this.data.prefixFormat
    },
    digit(){
      return this.data.digit || 0
    },
    currency(){
      if (this.data.numberType == 'amount') {
        return this.data.currency || '￥'
      }
    },
    thousandth(){
      return this.data.thousandth == 1 ? ',' : ''
    },
    cnyText(){
      const num = accounting.unformat(this.formatValue)
      if (this.data.numberType == 'amount') {
        return money2cny(num)
      } else {
        return number2text(num, this.digit)
      }
    },
    showCnyText(){
      return this.data.cnyText == 1 && this.stateValue
    },
    cnyTextStyle(){
    },
  },
  methods: {
    _input (e){
      let val = e
      this.input(val)
    },
    _focus(){
      this.showThousandth = false
      // if (this.formatValue) {
      //   this.input(accounting.unformat(this.formatValue))
      // }
    },
    _blur(){
      this.showThousandth = true
      // if (this.formatValue) {
      //   this.input(this.getFormat(this.formatValue))
      // }
    },
    getFormat(val){
      if (this.data.numberType == 'amount') {
        val = accounting.formatMoney(val, this.currency, this.digit, this.thousandth)
      } else {
        val = accounting.formatNumber(val, this.digit, this.thousandth)
      }
      return val
    }
  },
}
