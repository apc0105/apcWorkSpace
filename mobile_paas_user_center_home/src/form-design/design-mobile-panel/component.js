import JsonPanel from "@/form-design/json-panel";
import DesignFormPanel from "@/form-design/design-form-panel";

export default {
  name: 'form-design-mobile-panel',
  components: { JsonPanel, DesignFormPanel },
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
    emitInput(e){
      this.$emit('input', e)
    },
  }
}
