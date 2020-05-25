export default {

  created () {
    this._getList()
  },
  data () {
    return {
      pagination: {
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true
      },
      maskClosable: false
    }
  },
  methods: {
    showRecord (record, index) {
      return index
    },
    refresh () {
      this.queryParam.pageNum = 0
      this._getList()
    },
    _getList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.request(this.queryParam).then(res => {
          this.data = res.data.list
          console.log('请求到的数据', this.data)
          const pagination = { ...this.pagination }
          pagination.total = Number(res.data.total)
          pagination.current = this.queryParam.pageNum
          this.pagination = pagination
          this.loading = false
        })
      })
    },
    confirm (id) {
      const that = this
      this.$confirm({
        title: '此操作将永久删除该数据, 是否继续?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          that.deleteLists({ id: id }).then(res => {
            if (res.retCode === 200) {
              that.$message.success(res.message)
              that._getList()
            } else {
              that.$message.error(res.message)
            }
          })
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.deleteList = []
      selectedRows.forEach(val => {
        this.deleteList.push(val.id)
      })
    },
    refreshs () {
      this.queryParam.pageNumber = 0
      const pagination = { ...this.pagination }
      pagination.current = 0
      this._getList()
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.pageNumber = pagination.current
      this.queryParam.pageNum = pagination.current
      this.queryParam.pageSize = pagination.pageSize
      this.pagination = pager
      console.log('000')
      this._getList()
    }
  }
}
