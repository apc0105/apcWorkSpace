import FdControlMixins from "../fd-control-mixin";
import FdFormItem from '../fd-form-item'
import FdTableCell from "./fd-table-cell";
import FdTableHeader from "./fd-table-header";
import tableSummary from "./tableSummary";
import accounting from 'accounting'
import { hashCode } from "@/form-design/utils/stringUtils";
import eventbus from "@/form-design/utils/eventbus";
import { getRemote } from '@/api/system/dict'

export default {
  name: 'fd-table',
  mixins: [FdControlMixins],
  components: { FdTableCell, FdTableHeader, FdFormItem },
  props: {
    childElements: Object,
  },
  computed: {
    designData(){
      if (Array.isArray(this.value)) {
        return this.value
      }
      return []
    },
    cellHeight(){
      return this.sizeHeight + 8
    },
    cells (){
      return this.data.cellElement
    },
    controlKey(){
      if (this.design) {
        return hashCode(JSON.stringify(this.data) + JSON.stringify(this.childElements))
      }
    },
    operatorSize(){
      return Array.isArray(this.data.tableOperator) ? this.data.tableOperator.length : 0
    },
    operationWidth(){
      if (this.mobile) {
        return 45
      }
      return this.operatorSize * 35
    },
    showOperatorAdd(){
      return this.data.tableOperator.indexOf('add') >= 0
    },
    showOperatorRemove(){
      return this.data.tableOperator.indexOf('remove') >= 0
    },
    showSummary(){
      return this.data.cellElement.filter(item => item.sum == 1).length > 0
    },
  },
  data(){
    return {
      sums: [],
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      if (this.value == null || this.value == undefined || this.value.length == 0) {
        if (this.data.tableDataUrl) {
          getRemote(this.data.tableDataUrl)().then(data => {
            this.input(data.data)
          })
        } else {
          this.input([this.tableRowData()])
        }
      }
    },
    tableRowData(){
      //去组件的默认值
      const data = { id: new Date().getTime() }
      if (this.childElements) {
        for (let key in this.childElements) {
          const elementData = this.childElements[key]
          data[elementData.key] = elementData.defaultValue
        }
      }
      return data
    },
    tableCellData(cell){
      if (cell.elementId && this.childElements) {
        const data = this.childElements[cell.elementId] || {}
        data.labelShown = 0
        data.width = '100%'
        return data
      }
      return {};
    },
    cellLabel(cell){
      if (cell.elementId && this.childElements) {
        const cellData = this.childElements[cell.elementId]
        return cellData.name
      } else {
        return '请设置控件'
      }
    },
    cellWidth(cell){
      if (this.isEmpty(cell.width)) {
        return null;
      }
      return cell.width
    },
    weightTotal(){
      let total = 0
      this.data.cellElement.forEach(item => total += item.weight)
      return total
    },
    activeElement(){
      eventbus.$emit('activeFormElement', this.data)
    },
    summaryTable(param) {
      const sums = this.summaryTableColumn(param.data)
      this.sums = sums
      return sums;
    },
    summaryTableColumn(tableDatas){
      const startIndex = this.data.showIndex == 1 ? 1 : 0
      return tableSummary(tableDatas, this.data.cellElement, this.tableCellData, startIndex)
    },
    inputTableCell(){
      this.input([...this.designData])
    },
  }
}
