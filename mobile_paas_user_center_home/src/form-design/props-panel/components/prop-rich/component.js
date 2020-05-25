import FdControlMixin from "@/form-design/form-components/fd-control-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";
import FdRich from "@/form-design/form-components/fd-rich";

export default {
  name: 'prop-rich',
  mixins: [FdControlMixin],
  components: { FdFormItem, FdRich },
  props: {
    json: Object,
    vo: Object,
  },
  data(){
    return {
      visible: false,
    }
  },
  computed: {
    richData(){
      return { ...this.data, labelShown: 0 }
    }
  },
  created(){

  },
  methods: {
    open(){
      this.visible = true
    },
    close(){
      this.visible = false
    },
    confirm(){
      this.close()
    },
  }
}
