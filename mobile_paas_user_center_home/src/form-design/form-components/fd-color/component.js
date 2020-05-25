import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'

export default {
  name: 'fd-color',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {
    alpha(){
      return this.data.alpha == 1
    }
  }
}
