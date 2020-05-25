import ElDnd from "@/directive/el-dnd";
import DragDropMixins from "@/form-design/mixins/drag-drop-mixins";
import { isLayout } from "@/form-design/form-props";
import eventbus from "@/form-design/utils/eventbus";
import { hashCode } from "@/form-design/utils/stringUtils";

export default {
  name: 'fd-table-header',
  mixins: [DragDropMixins],
  directives: { ElDnd },
  props: {
    value: Object,
    index: Number,
    cellHeight: Number,
    weightTotal: Number,
    tableData: Object,
  },
  data(){
    return {}
  },
  computed: {
    dndDropData (){
      return {
        group: this.dndGroupName,
        dndAdd: false,
        dragEnable: false,
        dropEnable: true,
        elementId: this.el ? this.el.parentId : null,
        element: this.el,
        elType: this.el ? this.el.type : null,
        index: this.index,
      }
    },
    showElement(){
      if (this.el && this.el.id) {
        return true
      }
    },
    el(){
      return this.data
    },
    controlKey(){
      return this.data ? hashCode(JSON.stringify(this.data)) : -1
    },
  },
  methods: {
    getDropParam(){
      return { parentId: this.tableData.id, parentIndex: this.index }
    },
    activeElement(){
      if (this.showElement) {
        eventbus.$emit('activeFormElement', this.el)
      } else {
        this.$emit('click')
      }
    },
    getDropDisable(source){
      if (this.showElement) {
        return true
      }
      if (!source.dndAdd) {
        return true
      }
      return isLayout(source.elType)
    },
  }
}
