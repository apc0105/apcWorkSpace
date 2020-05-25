import FdControlMixins from '../fd-control-mixin'
import FdFormItem from '../fd-form-item'
import FdLayoutCell from './fd-layout-cell'
import { hashCode } from '@/form-design/utils/stringUtils'

export default {
  name: 'fd-layout',
  mixins: [FdControlMixins],
  components: { FdLayoutCell, FdFormItem },
  props: {
    childElements: Object,
  },
  computed: {
    cellHeight(){
      return this.sizeHeight + 8
    },
    boxStyle(){
      const styles = []
      if (this.mobile) {
        styles.push(`min-height:${this.cellHeight * this.data.cells}px`)
      } else {
        styles.push(`min-height:${this.cellHeight}px`)
      }
      return styles.join(';')
    },
    layoutCellStyle(){
      const styles = []
      if (this.mobile) {
        styles.push(`min-height:${this.cellHeight * this.data.cells}px`)
      } else {
        styles.push(`min-height:${this.cellHeight}px`)
      }
      return styles.join(';')
    },
    cells (){
      return this.data.cellElement
    },
    controlKey(){
      if (this.design) {
        return hashCode(JSON.stringify(this.data) + JSON.stringify(this.childElements))
      }
    },
  },
  created(){
    this.init()
  },
  methods: {
    init(){

    },
    layoutCellData(cell){
      if (cell.elementId && this.childElements) {
        const data = this.childElements[cell.elementId] || {}
        data.width = '100%'
        return data
      }
      return {}
    },
    weightTotal(){
      let total = 0
      this.data.cellElement.forEach(item => total += item.weight)
      return total
    },
  }
}
