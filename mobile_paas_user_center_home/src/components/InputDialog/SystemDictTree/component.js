import { mapState, mapGetters, mapActions } from 'vuex'
import ApiComponent from '@/components/ApiComponent'
import TreeTable from '@/components/TreeTable'
import pagesMixin from '@/mixins/pagesMixin'

export default {
  name: 'SystemDictTree',
  mixins: [pagesMixin],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Array,
    },
    filterId: {
      type: [String, Number],
    },
    param: {
      type: Object,
      default: () => {
      }
    }
  },
  components: {
    ApiComponent,
    TreeTable,
  },
  computed: {
    ...mapState(['dict']),
    singleItemId() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        return this.multipleSelection[0].id
      }
    }
  },
  watch: {
    selection(val){
      this.initSelection(val)
    }
  },
  data(){
    return {
      // columns: [
      //   {text: this.i18n('label.name'), value: 'name',},
      //   {text: this.i18n('label.code'), value: 'code',},
      //   {text: this.i18n('label.index'), value: 'index',},
      // ],
    }
  },
  created(){
    this.initSelection(this.selection)
    this.createLoad()
  },
  methods: {
    ...mapActions(['getDictTree',]),
    initSelection(val){
      this.multipleSelection = val || []
    },
    pagesData(){
      return this.area.tree
    },
    tableData(){
      const pages = this.pagesData()
      return pages.data
    },
    getInitFilter() {
      return { filterId: this.filterId }
    },
    fetchPageData({ filter, sort, pager }){
      this.getDictTree(filter).then(data => {
        this.$nextTick(() => this.initSelectionChange())
      })
    },
    disableLevel(row, index){
      if (!this.param) {
        return false
      }
      const { matchLevel }=this.param
      if (matchLevel == null || matchLevel == undefined) {
        return false
      }
      return row.level != matchLevel
    },
    isFilterRow(row, index){
      if (!this.param) {
        return false
      }
      const { filterId }=this.param
      if (filterId == null || filterId == undefined) {
        return false
      }
      return row.id == filterId || row.categoryId1 == filterId || row.categoryId2 == filterId
    },
    selectable(row, index){
      if (this.disableLevel(row, index) || this.isFilterRow(row, index)) {
        return false
      }
      return true
    },
    rowClassName({ row, index }){
      if (this.selectable(row)) {
        return 'input-dialog-table-selectenable'
      }
      return 'input-dialog-table-selectdisable'
    },
    handleClickRow(row, column, event){
      if (!this.selectable(row)) {
        this.$refs.table.setCurrentRow()
        return
      }
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
      const rows = this.multipleSelection.map(item => ({
        id: item.id,
        categoryId1: item.categoryId1,
        categoryId2: item.categoryId2,
        name: item.fullname,
        code: item.code,
        icon: item.icon
      }))
      this.$emit('change', rows)
    },
    initSelectionChange() {
      if (this.multiple) {
        this.$refs.table.clearSelection();
        const rowMap = {}
        this.convert2map(this.tableData(), rowMap)
        this.multipleSelection.forEach(row => {
          const item = rowMap[row.id]
          item && this.$refs.table.toggleRowSelection(item, true);
        })
      } else {
        const row = this.multipleSelection.length > 0 ? this.multipleSelection[0] : null
        this.$refs.table.setCurrentRow(row)
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
