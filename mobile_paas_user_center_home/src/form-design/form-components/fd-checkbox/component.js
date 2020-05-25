import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import FdSelectedMixins from '../fd-selected-mixin'

export default {
  name: 'fd-checkbox',
  mixins: [FdControlMixins, FdSelectedMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number, Array],
  },
  computed: {
    stateValue() {
      return this.value || []
    },
    itemType(){
      if (this.data.itemBtnStyle) {
        return 'el-checkbox-button'
      } else {
        return 'el-checkbox'
      }
    },
  },
  created(){
  },
  mounted(){
  },
  methods: {}
}
