import { mapState, mapGetters, mapActions } from 'vuex'
import ApiComponent from '@/components/ApiComponent'
import TreeTable from '@/components/TreeTable'
import pagesMixin from '@/mixins/pagesMixin'

export default {
  name: 'SystemMenuTree',
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
    }
  },
  components: {
    ApiComponent,
    TreeTable,
  },
  computed: {
    ...mapState(['menu']),
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
    return {}
  },
  created(){
    this.initSelection(this.selection)
    this.createLoad()
  },
  methods: {
    ...mapActions(['getMenuList',]),
    initSelection(val){
      this.multipleSelection = val || []
    },
    pagesData(){
      return this.menu.list
    },
    tableData(){
      const pages = this.pagesData()
      return pages.data
    },
    getInitFilter() {
      return { filterId: this.filterId }
    },
    fetchPageData({ filter, sort, pager }){
      this.getMenuList(filter).then(data => {
        this.$nextTick(() => this.initSelectionChange())
      })
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
      const rows = this.multipleSelection.map(item => ({ ...item }))
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
