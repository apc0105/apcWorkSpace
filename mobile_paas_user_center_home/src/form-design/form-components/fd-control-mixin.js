import emitter from 'element-ui/src/mixins/emitter'
import { hashCode } from '@/form-design/utils/stringUtils'
import accounting from 'accounting'
const _length = val => val ? val.length : 0

const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PHONE_REG = /^((0\\d{2,3}-\\d{7,8})|(1[3456789]\\d{9}))$/
const TEL_REG = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,6})?$/
const NUMBER_REG = /^(\-|\+)?\d+(\.\d+)?$/

const SIZE_HEIGHT_MAP = {
  large: 40,
  medium: 36,
  small: 32,
  mini: 28
}

export default {
  mixins: [emitter],
  props: {
    vo: Object,
    data: Object,
    json: Object,
    config: Object,
    value: [String, Number, Array, Object, Boolean, Date, Symbol],
    prop: [String, Number],
    design: Boolean,
    mobile: Boolean
  },
  watch: {
    value(val) {
      this.initValue(val)
    }
  },
  data() {
    return {
      // stateValue: null,
      options: []
    }
  },
  computed: {
    stateValue() {
      return this.value
    },
    controlKey() {
      if (this.design) {
        return hashCode(JSON.stringify(this.data))
      }
    },
    elFormAttrs() {
      return {
        vo: this.vo,
        data: this.data,
        config: this.config,
        value: this.value,
        prop: this.prop,
        design: this.design,
        mobile: this.mobile
      }
    },
    formAttrs() {
      return {
        label: this.label,
        labelWidth: this.labelWidth,
        labelPosition: this.data.labelAlign,
        labelSuffix: this.labelSuffix,
        class: this.formItemClass,
        rules: this.rules,
        prop: this.prop,
        size: this.size
        // key: this.controlKey,
      }
    },
    layoutAttrs() {
      return {
        class: this.formItemClass
      }
    },
    label() {
      if (this.data.labelShown == 0) {
        return null
      }
      return this.i18n(this.data.name)
    },
    labelWidth() {
      if (this.data.labelShown == 0) {
        return null
      }
      return this.data.labelWidth
    },
    size() {
      const controlSize = this.data.size
      const configSize = this.config ? this.config.size : null
      return controlSize || configSize || 'medium'
    },
    sizeHeight() {
      return SIZE_HEIGHT_MAP[this.size] || 36
    },
    readonly() {
      return this.data.readonly == 1
    },
    disabled() {
      return this.data.disabled == 1
    },
    formItemClass() {
      const clz = {}
      clz['form-item-label-top'] = this.data.labelAlign == 'top'
      clz['form-item-label-none'] = this.data.labelShown == 0
      return clz
    },
    paddingStyle() {
      const styles = []
      if (this.data.paddingTop) {
        styles.push(`padding-top:${this.data.paddingTop}`)
      }
      if (this.data.paddingBottom) {
        styles.push(`padding-bottom:${this.data.paddingBottom}`)
      }
      if (this.data.paddingLeft) {
        styles.push(`padding-left:${this.data.paddingLeft}`)
      }
      if (this.data.paddingRight) {
        styles.push(`padding-right:${this.data.paddingRight}`)
      }
      return styles
    },
    labelSuffix() {
      return '：'
    },
    rules() {
      const rules = []
      if (this.data.required) {
        rules.push({ required: true, trigger: 'blur', message: this.i18n(this.data.name) + '不能为空' })
      }
      if (this.data.number == 1 && !this.data.suffixFormat && !this.data.prefixFormat) {
        rules.push(this.validateRegex(NUMBER_REG, this.i18n(this.data.name) + '必须为数字', true))
      }
      if (this.data.regx) {
        rules.push(this.validateRegex(this.data.regx, this.i18n(this.data.name) + '输入错误'))
      }
      if (!this.isEmpty(this.data.min)) {
        rules.push(this.validateFn(value => Number.parseFloat(value) >= this.data.min, this.i18n(this.data.name) + '值应大于' + this.data.min))
      }
      if (!this.isEmpty(this.data.max)) {
        rules.push(this.validateFn(value => Number.parseFloat(value) <= this.data.max, this.i18n(this.data.name) + '值应小于' + this.data.max))
      }
      if (this.data.minLength > 0) {
        rules.push(this.validateFn(value => _length(value) < this.data.minLength, this.i18n(this.data.name) + '应不少于' + this.data.minLength + '位字符'))
      }
      if (this.data.maxLength > 0) {
        rules.push(this.validateFn(value => _length(value) > this.data.maxLength, this.i18n(this.data.name) + '应不多于' + this.data.maxLength + '位字符'))
      }
      if (this.data.email == 1) {
        rules.push(this.validateRegex(EMAIL_REG, this.i18n(this.data.name) + '输入错误'))
      }
      if (this.data.phone == 1) {
        rules.push(this.validateRegex(PHONE_REG, this.i18n(this.data.name) + '输入错误'))
      }
      if (this.data.tel == 1) {
        rules.push(this.validateRegex(TEL_REG, this.i18n(this.data.name) + '输入错误'))
      }
      return rules
    }
  },
  mounted() {
    this.initValue(this.value || this.data.defaultValue)
    // 初始化默认值
    if (this.isEmpty(this.value) && !this.isEmpty(this.data.defaultValue)) {
      this.input(this.data.defaultValue)
    }
  },
  methods: {
    i18n(keys) {
      if (this.data.i18nLabel) {
        return this._i18n_(keys)
      } else {
        return keys
      }
    },
    initValue(val) {
      // this.stateValue = val
    },
    initOptions() {
      if (this.data.options) {
        return this.setOptions(this.data.options)
      } else if (this.data.enums) {
        const enums = this.data.enums.replace(RegExp('，', 'g'), ',')
        return this.setOptions(enums.split(','))
      } else if (this.dictCode) {
        // 加载数据字典
      }
    },
    setOptions(options) {
      this.options = options
    },
    validate(e) {
      this.dispatch('ElFormItem', 'el.form.blur', [e])
    },
    isEmpty(val) {
      return val == null || val == undefined || (typeof val === 'string' && val.trim() == '')
    },
    input(val) {
      this.validate(val)
      this.triggerChange(val)
      this.$emit('input', val)
      this.initValue(val)
    },
    validateRegex(reg, msg, isNumber) {
      return {
        validator: (rule, value, callback) => {
          var regex = new RegExp(reg)
          if (this.isEmpty(value) || regex.test(isNumber ? accounting.unformat(value) : value)) {
            callback()
          } else {
            callback([msg])
          }
        },
        trigger: 'blur'
      }
    },
    validateFn(fn, msg) {
      return {
        validator: (rule, value, callback) => {
          if (fn(value)) {
            callback()
          } else {
            callback([msg])
          }
        },
        trigger: 'blur'
      }
    },
    triggerChange(val) {
      const onChange = this.data.onChange
      if (typeof onChange === 'function') {
        onChange.apply(this, [val, this.vo])
      }
    },
    getNumber(str) {
      const num = Number.parseFloat(str)
      return Number.isNaN(num) ? 0 : num
    },
    _dv_(val, def) {
      return val || def
    }
  }
}
