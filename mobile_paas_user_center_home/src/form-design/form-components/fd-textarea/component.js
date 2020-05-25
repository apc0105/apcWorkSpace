import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
export default {
  name: 'fd-textarea',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {
    autosize(){
      if (this.data.autosize == 1) {
        return true
      }
      if (this.data.minRows || this.data.maxRows) {
        return {
          minRows: this.data.minRows || 0,
          maxRows: this.data.maxRows || 99,
        }
      }
      return false
    }
  },
  methods: {},
}
