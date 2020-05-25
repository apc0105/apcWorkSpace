import FdControlMixins from "../../fd-control-mixin";
import FdFormItemMixins from "@/form-design/mixins/fd-form-item-mixins";
import ElDnd from "@/directive/el-dnd";
import DragDropMixins from "@/form-design/mixins/drag-drop-mixins";
import { isLayout } from "@/form-design/form-props";

export default {
  name: 'fd-layout-cell',
  mixins: [FdControlMixins, FdFormItemMixins, DragDropMixins],
  directives: { ElDnd },
  props: {
    value: Object,
    index: Number,
    cellHeight: Number,
    weightTotal: Number,
    layoutData: Object,
    cellConfig: Object,
  },
  data(){
    return {}
  },
  computed: {
    formItemStyle(){
      const styles = []
      const cellElement = this.layoutData.cellElement
      styles.push(`min-height: ${this.cellHeight}px `)
      if (this.mobile) {
        styles.push('flex-grow: 1')
        if (this.index + 1 < this.layoutData.cells) {
          styles.push(`border-bottom:${this.layoutData.controlBorderWidth} ${this.layoutData.controlBorderStyle} ${this.layoutData.controlBorderColor}`)
        }
      } else {
        if (!cellElement || this.index >= cellElement.length) {
          styles.push('flex-grow: 1')
        } else {
          const weight = this.cellConfig.weight
          styles.push('flex-grow: ' + weight)
          styles.push('max-width: ' + (weight / this.weightTotal * 100 + '%'))
        }
        if (this.index + 1 < this.layoutData.cells) {
          styles.push(`border-right:${this.layoutData.controlBorderWidth} ${this.layoutData.controlBorderStyle} ${this.layoutData.controlBorderColor}`)
        }
      }
      return styles.join(';')
    },
    formInnerStyle(){
      const styles = [...this.marginStyle, ...this.paddingStyle]
      return styles.join(';')
    },
    showElement(){
      if (this.el && this.el.id) {
        return true
      }
    },
    el(){
      return this.data
    }
  },
  methods: {}
}
