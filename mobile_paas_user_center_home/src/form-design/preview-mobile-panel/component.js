import JsonPanel from "@/form-design/json-panel";
import PreviewFormPanel from "@/form-design/preview-form-panel";
import { MessageBox } from "element-ui";

export default {
  name: 'form-preview-mobile-panel',
  components: { JsonPanel, PreviewFormPanel },
  props: {
    value: Object,
    activeEl: Object,
    formData: Object,
  },
  data (){
    return {}
  },
  computed: {
    json(){
      return this.value
    },
    screenScroll(){
      if (!this.json || !this.json.config) {
        return false;
      }
      return this.json.config.pageScroll == 1
    },
    pageFixed(){
      if (!this.json || !this.json.config) {
        return false;
      }
      return this.json.config.fixed == 1
    },
    pageStyle(){
      return 'background-color:' + this.json.config.bgColor
    },
    formTitle(){
      return {}
    }
  },
  mounted(){
  },
  destroyed(){
  },
  created(){
    this.init()
  },
  methods: {
    init() {
    },
    emitInput(){
      this.$emit('input', this.json)
    },
    validate(cb){
      this.$refs['elForm'].validate(valid => cb(valid))
    },
    doSubmit(){
      this.validate(valid => {
        if (valid) {
          MessageBox.alert(this.formData)
          this.$emit('close')
        }
      })
    }
  }
}
