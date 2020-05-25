export default {
  list: {
    created () {
      this._getList()
    },
    data () {
      return {
        maskClosable: false
      }
    },
    methods: {
      confirm (id) {
        this.deleteList = []
        this.deleteList.push(id)
        this.deleteMult()
      },
      _findTree () {
        return new Promise((resolve, reject) => {
          this.findTree().then(res => {
            this.treeData = this.transform(res.data, 'key', 'parId', 'children')
          })
        })
      },
      handleDetail (row) {
        this.rows = row.id
        this.$refs.detailModal.details()
        this._getList()
      },
      handleEdit (row) {
        this.rows = row.id
        this.$refs.editModal.update()
        this._getList()
      },
      handleAdd () {
        this.rows = ''
        this.$refs.editModal.add()
        this._getList()
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.deleteList = []
        selectedRows.forEach(val => {
          this.deleteList.push(val.id)
        })
      },
      onSelectChanges (selectedRowKeys, selectedRows) {
        this.selectedRowKeyss = selectedRowKeys
        this.deleteList = []
        selectedRows.forEach(val => {
          this.deleteList.push(val.id)
        })
      },
      deleteMult () {
        if (this.deleteList.length !== 0) {
          const that = this
          this.$confirm({
            title: '此操作将永久删除该数据, 是否继续?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk () {
              that.deleteLists({ ids: JSON.stringify(that.deleteList) }).then(res => {
                that.selectedRowKeys = []
                if (res.retCode === 200) {
                  that.$message.success(res.message)
                  that._getList()
                } else {
                  that.$message.error(res.message)
                }
              })
            }
          })
        } else {
          this.$message.error('请至少选择一条要删除的数据')
        }
      },
      _getList () {
        this.loading = true
        return new Promise((resolve, reject) => {
          this.request(this.queryParam).then(res => {
            this.data = res.data.content
            const pagination = { ...this.pagination }
            pagination.total = res.data.totalElements
            pagination.current = this.queryParam.pageNo + 1
            this.pagination = pagination
            this.loading = false
          })
        })
      },
      refreshs () {
        this.queryParam.pageNo = 0
        const pagination = { ...this.pagination }
        pagination.current = 1
        this._getList()
      },
      handleTableChange (pagination, filters, sorter) {
        const pager = { ...this.pagination }
        pager.pageNo = pagination.current
        this.queryParam.pageNo = pager.pageNo - 1
        this.pagination = pager
        this._getList()
      },
      onChangeDate (date, dateString) {
        this.queryParam.biddingDate = dateString.join(',')
      }
    }
  },
  upload: {
    data () {
      return {
        maskClosable: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileLists: [],
        action: this.$UPLOAD_URL.UPLOAD_URL
      }
    },
    methods: {
      handleCancels () {
        this.previewVisible = false
        this.previewImage = ''
      },
      handlePreview (file) {
        var image = file.type.substring(file.type.lastIndexOf('/') + 1)
        var imgStr = /(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG|gif|GIF)$/
        if (imgStr.test(image)) {
          this.previewImage = file.url || file.thumbUrl
          this.previewVisible = true
        } else {
          window.open(file.url)
        }
      },
      handleChange (info) {
        let fileList = [...info.fileList]
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = this.action + 'download/' + file.response.data[0].id
          }
          return file
        })
        this.fileList = fileList
      },
      getDetails (id) {
        return new Promise((resolve, reject) => {
          this.detail({ id: id }).then(res => {
            this.params = res.data
            if (res.data.auditDate) {
              this.round = res.data.auditDate
            }
            this.form.setFieldsValue({
              auditUnit: res.data.auditUnit
            })
            if (res.param) {
              if (res.param.proPackage !== 'a') {
                this.subPackageData = res.param.proPackage
                this.subPackageData.forEach((res, index) => {
                  res.number = index + 1
                })
              } else {
                this.subPackageData = []
              }
              if (res.param.proContract !== 'a') {
                this.contractData = res.param.proContract
                this.contractData.forEach((res, index) => {
                  res.number = index + 1
                })
              } else {
                this.contractData = []
              }
              if (res.param.proContractPay !== 'a') {
                this.paymentData = res.param.proContractPay
                this.paymentData.forEach((res, index) => {
                  res.number = index + 1
                })
              } else {
                this.paymentData = []
              }
            }
            if (res.data.biddingFileKey) {
              this.zbfileList = JSON.parse(res.data.biddingFileKey)
            } else { this.zbfileList = [] }
            if (res.data.auditFileKey) {
              this.fileListself = JSON.parse(res.data.auditFileKey)
            } else { this.fileListself = [] }
            if (res.data.fileKey) {
              this.fileList = JSON.parse(res.data.fileKey)
            } else { this.fileList = [] }
            if (res.data.apprFileKey) { this.fileLists = JSON.parse(res.data.apprFileKey) } else { this.fileLists = [] }
            this.htfileList = []
            if (res.param.listFile.length !== 0) {
              res.param.listFile.forEach(res => {
                if (res !== []) {
                  this.htfileList.push(res[0])
                }
              })
            } else { this.htfileList = [] }
            this.fkfileList = []
            if (res.param.checkListFile.length !== 0) {
              res.param.checkListFile.forEach(res => {
                this.fkfileList.push(res[0])
              })
            } else { this.fkfileList = [] }
          })
        })
      }
    }
  }
}
