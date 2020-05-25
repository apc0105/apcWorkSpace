import FdControlMixins from '../fd-control-mixin'
import FdFormItem from '../fd-form-item'
import FdGridCell from './fd-grid-cell'
import { hashCode } from '@/form-design/utils/stringUtils'
import eventbus from "@/form-design/utils/eventbus";

import ElSelection from "@/form-design/form-components/fd-grid-design/el-selection";
import "@/form-design/form-components/fd-grid-design//el-selection/style.scss";


export default {
  name: 'fd-grid',
  mixins: [FdControlMixins],
  components: { FdGridCell, FdFormItem },
  directives: { ElSelection },
  props: {
    childElements: Object,
  },
  data(){
    return {
      mergeFlag: false,
      selectionFlag: false,
      selectionMoveFlag: false,
      selectionData: {
        showRange: false,
        enable: this.design,
        mergeFlag: this.mergeFlag,
        selectionStart: 'selectionStart',
        selectionMove: 'selectionMove',
        selectionEnd: 'selectionEnd',
        selectionClose: 'selectionClose',
      },
      selectionRange: {
        sx: -1,
        sy: -1,
        ex: -1,
        ey: -1,
      },
    }
  },
  computed: {
    cellHeight(){
      return this.sizeHeight + 8
    },
    controlKey(){
      if (this.design) {
        return hashCode(JSON.stringify(this.data) + JSON.stringify(this.childElements))
      }
    },
    borderWidth(){
      return this.data.controlBorderWidth || 1
    },
    borderColor(){
      return this.data.controlBorderColor
    },
    minHeightStyle(){
      const styles = []
      if (this.mobile) {
        styles.push(`min-height:${this.cellHeight * this.data.rows * this.data.cells}px`)
      } else {
        styles.push(`min-height:${this.cellHeight * this.data.rows}px`)
      }
      return styles.join(';')
    },
  },
  created(){
    this.init()
  },
  updated(){
  },
  methods: {
    init(){

    },
    gridStyle(){
      const styles = []
      if (this.mobile) {
        styles.push(`min-height:${this.cellHeight * this.data.rows * this.data.cells}px`)
      } else {
        styles.push(`min-height:${this.cellHeight * this.data.rows}px`)
      }
      styles.push(`width:${this.gridWidth()}px`)
      return styles.join(';')
    },
    gridCellKey(rindex, cindex){
      return this.gridCellData(rindex, cindex).id || `${rindex}-${cindex}`
    },
    gridCellIndex(rindex, cindex){
      return (rindex - 1) * this.data.cells + (cindex - 1)
    },
    gridColumnConfig(cindex){
      const cell = this.data.cellElement[cindex - 1] || {}
      return cell
    },
    gridCellConfig(rindex, cindex){
      const cell = this.data.gridElement[rindex - 1][cindex - 1]
      return cell
    },
    gridCellData(rindex, cindex){
      const cell = this.gridCellConfig(rindex, cindex)
      if (cell.elementId && this.childElements) {
        const data = this.childElements[cell.elementId] || {}
        return data
      }
      return {};
    },
    weightTotal(){
      let total = 0
      this.data.cellElement.forEach(item => total += item.weight)
      return total
    },
    dragDrop(){
      this.$emit('dragDrop')
    },
    activeElement(){
      eventbus.$emit('activeFormElement', this.data)
    },
    gridWidth(){
      let width = 0
      if (this.mobile) {
        width = this.$refs['gridTable'] ? this.$refs['gridTable'].clientWidth : 800
      } else {
        width = this.config ? this.getInt(this.config.formWidth) : 800
      }
      width -= this.getInt(this.data.marginLeft)
      width -= this.getInt(this.data.marginRight)
      width -= this.getInt(this.data.paddingLeft)
      width -= this.getInt(this.data.paddingRight)
      return width
      // return width - this.getInt(this.borderWidth) * 1
    },
    getInt(str){
      const num = Number.parseFloat(str)
      if (Number.isNaN(num)) {
        return 0
      }
      return num
    },
    selectionStart(){
      this.selectionFlag = true
      this.selectionMoveFlag = false
    },
    selectionMove(){
      this.selectionMoveFlag = true
    },
    selectionEnd(){
      this.selectionFlag = false
      this.selectionMoveFlag = false
    },
    selectionStartCell(e){
      this.closeSelection()
      this.selectionRange.sx = e.cindex
      this.selectionRange.sy = e.rindex
    },
    selectionMoveCell(e){
      this.selectionEndCell(e)
    },
    selectionEndCell(e){
      this.selectionRange.ex = e.cindex
      this.selectionRange.ey = e.rindex
    },
    selectionOverCell(){
      this.closeSelection()
    },
    closeSelection(){
      this.selectionRange = {
        sx: -1,
        sy: -1,
        ex: -1,
        ey: -1,
      }
    },
    toggleMergeModel(mergeFlag){
      this.mergeFlag = mergeFlag
    }
  }
}
