import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'

export default {
  name: 'fd-switch',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {
    stateText(){
      if (this.stateValue == this.activeValue) {
        return this.data.activeText ? this.i18n(this.data.activeText) : null
      } else {
        return this.data.inactiveText ? this.i18n(this.data.inactiveText) : null
      }
    },
    disabled(){
      return this.data.disabled == 1 || this.data.readonly == 1
    },
    activeValue(){
      return this.isEmpty(this.data.activeValue) ? 1 : this.data.activeValue
    },
    inactiveValue(){
      return this.isEmpty(this.data.inactiveValue) ? 0 : this.data.inactiveValue
    }
  }
}
