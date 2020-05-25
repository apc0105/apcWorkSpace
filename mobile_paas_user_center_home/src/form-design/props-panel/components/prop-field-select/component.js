import eventbus from '@/form-design/utils/eventbus'
import FdControlMixin from "@/form-design/form-components/fd-control-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";

export default {
  name: 'prop-field-select',
  mixins: [FdControlMixin],
  components: { FdFormItem },
  props: {
    defobjectFields: [Array],
    json: Object,
    vo: Object,
  },
  data(){
    return {
      visible: false,
    }
  },
  computed: {
    elements(){
      return this.defobjectFields
    },
    emptyOptions(){
      return !this.value || this.value.length == 0
    },
  },
  created(){

  },
  methods: {
    open(){
      // this.visible = true
    },
    close(){
      this.visible = false
    },
    refresh(){
      eventbus.$emit('updateDefobjectFields')
    },
    confirm(){
      this.close()
    },
    statusText(row){
      const bindRow = this.getBindRow(row)
      if (bindRow) {
        return bindRow.name
      } else {
        return '点击绑定'
      }
    },
    getBindRow(row){
      if (!this.json || !this.json.elements || this.json.elements.length == 0) {
        return null
      }
      const length = this.json.elements.length
      for (let i = 0; i < length; i++) {
        const item = this.json.elements[i]
        if (item.key == row.key) {
          return item
        }
      }
      return null
    },
    bindRow(row){
      this.input(row.key)
      this.vo.name = row.name
      this.close()
    }
  }
}
