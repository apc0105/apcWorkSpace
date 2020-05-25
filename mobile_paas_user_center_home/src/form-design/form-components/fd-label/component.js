import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'

export default {
  name: 'fd-label',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {
    formItemStyle(){
      const styles = []
      styles.push(`text-align:${this.data.labelAlign}`)
      styles.push(`font-size:${this.data.fontSize}`)
      styles.push(`color:${this.data.fontColor}`)
      return styles.join(';')
    }
  },
}
