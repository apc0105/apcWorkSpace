import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import InputDialog from "@/components/InputDialog";

export default {
  name: 'fd-input-dialog',
  mixins: [FdControlMixins],
  components: { InputDialog, FdFormItem },
  props: {
    value: [Object, Array],
  },
  computed: {}
}
