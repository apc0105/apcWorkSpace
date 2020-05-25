import { isLayout } from "@/form-design/form-props";
import FdFormItemMixins from '@/form-design/mixins/fd-form-item-mixins'

export default{
  name: 'form-preview-el',
  mixins: [FdFormItemMixins],
  directives: {},
  props: {
    data: {
      type: Object,
      default: {}
    },
    mobile: Boolean,
    active: Boolean,
    index: Number,
  },
  data(){
    return {}
  },
  watch: {
    data(val){
    }
  },
  computed: {
    isLayout(){
      return isLayout(this.data.type)
    }
  },
  methods: {}
}
