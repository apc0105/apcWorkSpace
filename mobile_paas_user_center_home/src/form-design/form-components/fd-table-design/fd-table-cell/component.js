import FdControlMixins from '../../fd-control-mixin'
import FdFormItemMixins from '@/form-design/mixins/fd-form-item-mixins'
import ElDnd from '@/directive/el-dnd'
import DragDropMixins from '@/form-design/mixins/drag-drop-mixins'
import { isLayout } from '@/form-design/form-props'
import eventbus from '@/form-design/utils/eventbus'

export default {
  name: 'fd-table-cell',
  mixins: [FdControlMixins, FdFormItemMixins, DragDropMixins],
  directives: { ElDnd },
  props: {
    value: Object,
    index: Number,
    row: Number,
    cellHeight: Number,
    weightTotal: Number,
    tableData: Object,
    cellConfig: Object
  },
  data() {
    return {}
  },
  computed: {
    classObject() {
      return {
        ...this.dropClass,
        'fd-form-table-cell-active': this.active
      }
    },
    formItemStyle() {
      const styles = []
      if (!this.showElement) {
        styles.push(`min-height: ${this.cellHeight}px `)
      }
      return styles.join(';')
    },
    formInnerStyle() {
      const styles = [...this.marginStyle, ...this.paddingStyle]
      return styles.join(';')
    },
    dndDropData() {
      if (this.design) {
        return {
          group: this.dndGroupName,
          dndAdd: false,
          dragEnable: false,
          dropEnable: true,
          elementId: this.el ? this.el.parentId : null,
          element: this.el,
          elType: this.el ? this.el.type : null,
          index: this.index
        }
      }
    },
    showEmptyTip() {
      if (this.el && this.el.id) {
        return false
      }
      if (!this.design) {
        return false
      }
      return true
    },
    showElement() {
      if (this.el && this.el.id) {
        return true
      }
    },
    el() {
      return this.data
    }
  },
  methods: {
    tableRowProp(key) {
      return this.tableData.key + '.' + this.row + '.' + key
    },
    getDropParam() {
      return { parentId: this.tableData.id, parentType: this.tableData.type, parentIndex: this.index }
    },
    activeElement() {
      if (this.showElement) {
        eventbus.$emit('activeFormElement', this.el)
      } else {
        this.$emit('click')
      }
    },
    getDropDisable(source) {
      if (this.showElement) {
        return true
      }
      if (!source.dndAdd) {
        return true
      }
      return isLayout(source.elType)
    },
    deleteCellElement() {
      eventbus.$emit('deleteFormElement', this.el)
    },
    inputTableCell() {
      this.$emit('input')
    }
  }
}
