export default {
  data(){
    return {
      keyword: null
    }
  },
  computed: {
    singleItemId() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        return this.multipleSelection[0].id
      }
    }
  },
  methods: {
    selectable(){
      return true
    },
    getInitFilter() {
      return {keyword: this.keyword}
    },
    searchPage(keyword){
      this.keyword = keyword
      this.loadPage()
    },
    handleClickRow(row, column, event){
      if (this.multiple) {
        this.$refs.table.toggleRowSelection(row);
      } else {
        this.multipleSelection = [row]
      }
      this.emitChangeSelection()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.emitChangeSelection()
    },
    emitChangeSelection(){
      const rows = this.multipleSelection.map(item => ({...item}))
      this.$emit('change', rows)
    },
    initSelectionChange() {
      const rowMap = {}
      this.convert2map(this.tableData(), rowMap)
      if (this.multiple) {
        this.$refs.table.clearSelection();
        this.multipleSelection.forEach(row => {
          const item = rowMap[row.id]
          item && this.$refs.table.toggleRowSelection(item, true);
        })
      } else {
        const row = this.multipleSelection.length > 0 ? this.multipleSelection[0] : null
        if (row) {
          this.$refs.table.setCurrentRow(rowMap[row.id])
        }
      }
    },
    clearSelection() {
      this.handleClearSelection()
      if (!this.multiple) {
        this.$refs.table.setCurrentRow()
      }
    },
    convert2map(rows, map){
      if (rows && rows.length > 0) {
        rows.forEach(item => {
          map[item.id] = item
          this.convert2map(item.children, map)
        })
      }
    }
  }
}
