import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'fd-rich',
  mixins: [FdControlMixins],
  components: { Tinymce, FdFormItem },
  props: {
    value: [String, Number],
  },
  computed: {}
}
