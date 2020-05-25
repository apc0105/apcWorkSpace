import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import FdSelectedMixins from '../fd-selected-mixin'

export default {
  name: 'fd-date',
  mixins: [FdControlMixins, FdSelectedMixins],
  components: { FdFormItem },
  props: {
    value: [String, Number, Date, Array],
  },
  computed: {
    stateValue() {
      if (this.data.dateType == 'daterange' || this.data.dateType == 'datetimerange') {
        if (!Array.isArray(this.value)) {
          return []
        }
        return this.value || []
      } else {
        return this.value
      }
    },
  },
  created(){
  },
  mounted(){
  },
  methods: {}
}
