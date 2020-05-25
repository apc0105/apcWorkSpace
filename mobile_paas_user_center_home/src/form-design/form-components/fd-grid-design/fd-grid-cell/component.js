import FdControlMixins from "../../fd-control-mixin";
import FdFormItemMixins from "@/form-design/mixins/fd-form-item-mixins";
import { hashCode } from "@/form-design/utils/stringUtils";
import ElDnd from "@/directive/el-dnd";
import ElRightmenu from "@/directive/el-rightmenu";
import "@/directive/el-rightmenu/style.scss";
import DragDropMixins from "@/form-design/mixins/drag-drop-mixins";
import { isLayout } from "@/form-design/form-props";
import eventbus from "@/form-design/utils/eventbus";

export default {
  name: 'fd-grid-cell',
  mixins: [FdControlMixins, FdFormItemMixins, DragDropMixins],
  directives: { ElDnd, ElRightmenu },
  props: {
    value: Object,
    index: Number,
    rindex: Number,
    cindex: Number,
    gridWidth: Number,
    cellHeight: Number,
    weightTotal: Number,
    gridData: Object,
    cellConfig: Object,
    columnConfig: Object,
    selectionMoveFlag: Boolean,
    selectionRange: Object,
  },
  data(){
    return {
      cellVisible: false,
      cellForm: {
        rowSpan: 1,
        colSpan: 1,
      },
    }
  },
  computed: {
    controlKey(){
      if (this.design) {
        return hashCode(JSON.stringify(this.data) + JSON.stringify(this.cellConfig) + JSON.stringify(this.columnConfig))
      }
    },
    selectionCell(){
      if (this.selectionRange.ex < 0 || this.selectionRange.ey < 0 ||
        this.selectionRange.sx < 0 || this.selectionRange.sy < 0) {
        return false
      }
      return this.selectionRange.sx <= this.cindex &&
        this.cindex <= this.selectionRange.ex &&
        this.selectionRange.sy <= this.rindex &&
        this.rindex <= this.selectionRange.ey
    },
    classObject(){
      const cls = {
        ...this.dropClass,
        'fd-form-grid-cell-active': this.active,
      }
      if (this.cindex == this.selectionRange.sx && ( this.selectionRange.sy <= this.rindex && this.rindex <= this.selectionRange.ey)) {
        cls['fd-form-grid-cell-selectionleft'] = true
      }
      if (this.cindex == this.selectionRange.ex && ( this.selectionRange.sy <= this.rindex && this.rindex <= this.selectionRange.ey)) {
        cls['fd-form-grid-cell-selectionright'] = true
      }
      if (this.rindex == this.selectionRange.sy && ( this.selectionRange.sx <= this.cindex && this.cindex <= this.selectionRange.ex)) {
        cls['fd-form-grid-cell-selectiontop'] = true
      }
      if (this.rindex == this.selectionRange.ey && ( this.selectionRange.sx <= this.cindex && this.cindex <= this.selectionRange.ex)) {
        cls['fd-form-grid-cell-selectionbottom'] = true
      }
      if (this.selectionCell) {
        cls['fd-form-grid-cell-selectionbg'] = true
      }
      return cls
    },
    minHeightStyle(){
      const styles = []
      styles.push(`min-height: ${this.cellHeight}px `)
      return styles.join(';')
    },
    gridCellStyle(){
      const styles = []
      styles.push(`min-height: ${this.cellHeight}px `)
      if (!this.mobile) {
        const weight = this.cellWeight()
        const rate = weight / this.weightTotal
        const mrate = rate * 100 + '%'
        const width = (rate * this.gridWidth - this.getNumber(this.gridData.controlBorderWidth)) + 'px'
        styles.push(`min-height:${this.cellHeight}px`)
        // styles.push(`min-width:${mrate}`)
        // styles.push(`max-width:${mrate}`)
        styles.push(`width:${width}`)
        styles.push(`min-width:${width}`)
        styles.push(`max-width:${width}`)
      }
      return styles.join(';')
    },
    formInnerStyle(){
      const styles = [...this.marginStyle, ...this.paddingStyle]
      return styles.join(';')
    },
    dndDropData (){
      if (this.design) {
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
      }
    },
    menudata(){
      const data = {
        enable: this.design,
        menus: [
          { content: this._i18n_('label.flow.formdesign.grids.mergecell'), callback: "handleMergeTableCell" },
          { content: this._i18n_('label.flow.formdesign.grids.mergecancel'), callback: "handleMergeCancel" }
        ],
      }
      return data
    },
    showEmptyTip(){
      if (this.el && this.el.id) {
        return false
      }
      if (!this.design) {
        return false
      }
      return true
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
  methods: {
    cellWeight(){
      if (this.cellConfig.colSpan == 1) {
        return this.columnConfig.weight || 1
      }
      let weight = 0
      for (let i = 0; i < this.cellConfig.colSpan; i++) {
        const _index = this.cindex + i
        const cell = this.gridData.cellElement[_index]
        weight += (cell.weight || 1)
      }
      return weight
    },
    getDropParam(){
      return { parentId: this.gridData.id, parentType: this.gridData.type, parentIndex: this.index }
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
    deleteCellElement(){
      eventbus.$emit('deleteFormElement', this.el)
    },
    handleMergeCancel(){
      this.doMergeCancel(this.cellConfig, this.cellConfig)
    },
    handleMergeTableCell(){
      if (this.selectionRange.sx >= 0 && this.selectionRange.ex >= 0) {
        //选中合并
        const r = Math.min(this.selectionRange.sy, this.selectionRange.ey)
        const x = Math.min(this.selectionRange.sx, this.selectionRange.ex)
        const cell = this.gridData.gridElement[r][x]
        const param = {
          colSpan: Math.abs(this.selectionRange.ex - this.selectionRange.sx) + 1,
          rowSpan: Math.abs(this.selectionRange.ey - this.selectionRange.sy) + 1,
        }
        this.forEachTableCell(cell, param.rowSpan, param.colSpan, cell => {
          if (cell.rowSpan > 1 || cell.colSpan > 1) {
            this.doMergeCancel(cell, cell)
          } else {
            cell.render = 1
            cell.rowSpan = 1
            cell.colSpan = 1
          }
          return true
        })
        this.executeMergeCell(cell, param)
        this.$emit('selectionOverCell')
      } else {
        // this.cellVisible = true
        // this.cellForm.rowSpan = this.cellConfig.rowSpan
        // this.cellForm.colSpan = this.cellConfig.colSpan
      }
    },
    doMergeCancel(cell, { rowSpan, colSpan }){
      this.forEachTableCell(cell, rowSpan, colSpan, cell => {
        cell.render = 1
        cell.rowSpan = 1
        cell.colSpan = 1
        console.log('拆分的行：', JSON.stringify(cell))
        return true
      })
      cell.rowSpan = 1
      cell.colSpan = 1
      cell.render = 1
    },
    closeMergeTableCell(){
      this.cellVisible = false
    },
    doMergeTableCell(){
      this.cellVisible = false
      this.doMergeCancel(this.cellConfig, this.cellForm)
      this.executeMergeCell(this.cellConfig, this.cellForm)
    },
    forEachTableCell(ownCell, rowSpan, colSpan, callback){
      if (rowSpan <= 1 && colSpan <= 1) {
        return true
      }
      for (let r = 0; r < rowSpan; r++) {
        const ri = r + ownCell.rindex
        const row = this.gridData.gridElement[ri]
        if (!row) {
          continue
        }
        for (let c = 0; c < colSpan; c++) {
          const ci = c + ownCell.cindex
          const cell = row[ci]
          if (!cell) {
            continue
          }
          const r = callback(cell)
          if (!r) {
            return false
          }
        }
      }
      return true
    },
    executeMergeCell(ownCell, { colSpan, rowSpan }){
      //执行检查
      const r = this.forEachTableCell(ownCell, rowSpan, colSpan, cell => {
        if (ownCell.index == cell.index) {
          return true
        }
        if (cell.render == 0 || cell.rowSpan > 1 || cell.colSpan > 1) {
          this.$notify({
            title: '提示',
            message: '当前合并的行列中已合并的单元格，请先取消合并',
            type: 'error',
            duration: 2000
          })
          return false
        }
        return true;
      })

      if (!r) {
        return
      }

      //执行合并
      this.forEachTableCell(ownCell, rowSpan, colSpan, cell => {
        cell.render = 0
        cell.rowSpan = 1
        cell.colSpan = 1
        console.log('合并的行：', JSON.stringify(cell))
        return true
      })

      ownCell.rowSpan = rowSpan
      ownCell.colSpan = colSpan
      ownCell.render = 1
    },
    selectionStart(e){
      if (e.button != 0 || this.selectionCell) {
        return;
      }
      if (this.design) {
        this.$emit('selectionStartCell', { rindex: this.rindex, cindex: this.cindex })
      }
    },
    selectionEnd(e){
      if (e.button != 0) {
        return;
      }
      if (this.design) {
        if (this.selectionMoveFlag) {
          this.$emit('selectionEndCell', {
            rindex: this.cellConfig.rindex + this.cellConfig.rowSpan - 1,
            cindex: this.cellConfig.cindex + this.cellConfig.colSpan - 1,
          })
        } else {
          this.$emit('selectionOverCell')
        }
      }
    },
    selectionMove(e){
      if (e.buttons == 0 || this.selectionCell) {
        return;
      }
      if (this.design && this.selectionMoveFlag) {
        this.$emit('selectionEndCell', {
          rindex: this.cellConfig.rindex + this.cellConfig.rowSpan - 1,
          cindex: this.cellConfig.cindex + this.cellConfig.colSpan - 1,
        })
      }
    },
  }
}
