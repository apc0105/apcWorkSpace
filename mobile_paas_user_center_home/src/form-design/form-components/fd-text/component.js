import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'

export default {
  name: 'fd-text',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {},
  watch: {
    data(val){
      console.log(val)
    }
  },
  updated(){
    console.log(this.data)
  }
}
