import FdFormItem from '../fd-form-item'
import accounting from 'accounting'
import FdControlMixins from '../fd-control-mixin'
import { str2number, number2text, money2cny } from '@/form-design/utils/stringUtils'
import { isNumber } from "@/form-design/form-props";
export default {
  name: 'fd-compute',
  components: { FdFormItem },
  mixins: [FdControlMixins],
  props: {
    value: [String, Number],
  },
  data(){
    return {
      calculationing: false,
    }
  },
  computed: {
    expression(){
      return Array.isArray(this.data.expression) ? this.data.expression : []
    },
    formatValue(){
      let val = this.getExpressionValue()
      val = this.getFormat(val)
      return val
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
      // return this.data.cnyText == 1 && this.formatValue
      return this.data.computeType == 'numberAndCny' && this.formatValue
    },
    cnyTextStyle(){
    },
  },
  methods: {
    getFormat(val){
      if (this.data.numberType == 'amount') {
        if (this.data.computeType == 'cny') {
          val = money2cny(val)
        } else {
          val = accounting.formatMoney(val, this.currency, this.digit, this.thousandth)
        }
      } else {
        if (this.data.computeType == 'cny') {
          val = number2text(val, this.digit)
        } else {
          val = accounting.formatNumber(val, this.digit, this.thousandth)
        }
      }
      return val
    },
    getExpressionValue(){
      if (this.expression.length == 0) {
        return 0
      }
      const temp = []
      const fieldMap = this.getFieldMap()
      this.expression.forEach(item => {
        if (typeof item == 'string' || typeof item == 'number') {
          temp.push(item)
        } else {
          const field = fieldMap[item.id]
          if (field) {
            const value = this.vo[field.key] || 0
            temp.push(value)
          }
        }
      })
      try {
        return eval(temp.join(''));
      } catch (e) {
        console.warn(temp, e)
        this.$notify({
          title: '提示',
          message: '计算表达式计算出错',
          type: 'warning',
          duration: 2000
        })
        return 0
      }
    },
    getFieldMap(){
      const map = {}
      if (this.json && this.json.elements) {
        this.json.elements.forEach(item => {
          if (isNumber(item)) {
            map[item.id] = item
          }
        })
      }
      return map
    }
  },
}
