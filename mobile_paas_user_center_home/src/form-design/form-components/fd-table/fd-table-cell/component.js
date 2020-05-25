import FdControlMixins from "../../fd-control-mixin";
import FdFormItemMixins from "@/form-design/mixins/fd-form-item-mixins";
import { isLayout } from "@/form-design/form-props";

export default {
  name: 'fd-table-cell',
  mixins: [FdControlMixins, FdFormItemMixins],
  props: {
    value: Object,
    index: Number,
    row: Number,
    cellHeight: Number,
    weightTotal: Number,
    tableData: Object,
    cellConfig: Object,
  },
  data(){
    return {}
  },
  computed: {
    showElement(){
      if (this.el && this.el.id) {
        return true
      }
    },
    el(){
      return this.data
    },
    showElement(){
      if (this.el && this.el.id) {
        return true
      }
    },
    formItemStyle(){
      const styles = []
      if (!this.showElement) {
        styles.push(`min-height: ${this.cellHeight}px `)
      }
      return styles.join(';')
    },
    formInnerStyle(){
      const styles = [...this.marginStyle, ...this.paddingStyle]
      return styles.join(';')
    },
  },
  methods: {
    tableRowProp(key){
      return this.tableData.key + '.' + this.row + '.' + key
    },
    inputTableCell(){
      this.$emit('input')
    }
  }
}
