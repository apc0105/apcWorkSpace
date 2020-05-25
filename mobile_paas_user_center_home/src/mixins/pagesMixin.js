import { isLoading, isInit, isSuccess } from '@/store/stateUtil'

export default {
  created(){
  },
  beforeDestroy(){

  },
  activated(){
  },
  deactived(){
  },
  data(){
    return {
      multipleSelection: [],
      action: null,
      activeData: null,
      pageTableCache: true,
    }
  },
  methods: {
    getStartPager() {
      const pages = this.pagesData()
      const { pager = {} } = pages.data
      return { current: 1, pageSize: pager.pageSize }
    },
    getPager(){
      const pages = this.pagesData()
      const { pager = {} } = pages.data
      return { current: pager.current, pageSize: pager.pageSize }
    },
    showPagination(){
      const pages = this.pagesData()
      // return pages.data.pager.total > pages.data.pager.pageSize
      return true
    },
    pageLoading(){
      const pages = this.pagesData()
      return isLoading(pages)
    },
    pageCurrent(){
      const pages = this.pagesData()
      return pages.data.pager.current
    },
    pageSize(){
      const pages = this.pagesData()
      return pages.data.pager.pageSize
    },
    pageTotal(){
      const pages = this.pagesData()
      return pages.data.pager.total
    },
    tableData(){
      const pages = this.pagesData()
      return pages.data.dataList
    },
    createLoad(){
      const pages = this.pagesData()
      if (!this.pageTableCache || !isSuccess(pages)) {
        this.loadPage()
      }
    },
    loadPage() {
      const pages = this.pagesData()
      const { sort } = pages.data
      const filter = this.getInitFilter()
      this.fetchPageData({ filter, sort, pager: this.getStartPager() })
    },
    reloadPage() {
      const pages = this.pagesData()
      const { sort } = pages.data
      const pager = this.getPager()
      const filter = this.getInitFilter()
      this.fetchPageData({ filter, sort, pager })
    },
    getInitFilter(){
      return {}
    },
    handlerChangePage(current) {
      const pages = this.pagesData()
      const { sort, filter } = pages.data
      const pager = this.getPager()
      this.fetchPageData({ filter, pager: { ...pager, current }, sort })
    },
    handlerChangeSize(pageSize) {
      const pages = this.pagesData()
      const { sort, filter } = pages.data
      this.fetchPageData({ filter, pager: { pageSize, current: 1 }, sort })
    },
    handlerChangeSort(column){
      const pages = this.pagesData()
      const { filter } = pages.data
      const pager = this.getPager()
      const sort = {
        sortField: column.column.columnKey,
        sortType: column.order === 'ascending' ? 'ASC' : 'DESC',
      }
      this.fetchPageData({ filter, pager, sort })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClearSelection(){
      this.multipleSelection = []
      this.$refs['table'].clearSelection();
    },
    tableColumnWidth(a, b){
      const width = this.$refs['pageBody'] ? this.$refs['pageBody'].clientWidth : 800
      return Math.max(width * a, b)
    },
    handleClickRow(row, column, event){
      console.log(row, column, event)
    }
  }
}
