import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import FdSelectedMixins from '../fd-selected-mixin'

export default {
  name: 'fd-radio',
  mixins: [FdControlMixins, FdSelectedMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number]
  },
  computed: {
    itemType() {
      if (this.data.itemBtnStyle) {
        return 'el-radio-button'
      } else {
        return 'el-radio'
      }
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
  },
  methods: {}
}
