
import { transformToTreeFormat } from '@/utils/trans'
import { localDate } from '@/utils/changeData'
export default {
  list: {
    created () {
      this._getList()
    },
    data () {
      return {
        loading: false,
        pagination: {},
        selectedRowKeys: []
      }
    },
    //列表头部选中n项删除方法
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.deleteList = []
        selectedRows.forEach(val => {
          this.deleteList.push(val.id)
        })
      },
      _getList () {
        this.loading = true
        return new Promise((resolve, reject) => {
          this.request(this.queryParam).then(res => {//根据pagination分页对象中的参数请求数据
            let data = []
            if (res.data.list) {
              data = res.data.list
            } else {
              data = res.data
            }
            //将数据变成树的结构
            this.data = transformToTreeFormat({ key: 'id', parentKey: 'parId' }, data)
            console.log('打印this.data', this.data)
            const pagination = { ...this.pagination }
            pagination.total = parseInt(res.data.total)
            pagination.current = this.queryParam.pageNum
            this.pagination = pagination
            // console.log('打印当前的pagination', this.pagination)
            this.loading = false

          })
        })

      },
      // _usergetList () {
      //   this.loading = true
      //   return new Promise((resolve, reject) => {
      //     this.request(this.queryParam).then(res => {
      //       let data = []
      //       if (res.data.list) {
      //         data = res.data.list
      //         // console.log(data)
      //         // data.forEach((item,index)=>{
      //         //   //遍历得到的数据，将id项装进defaultExpandedRowKeys数组
      //         //   this.defaultExpandedRowKeys[index]=item.id
      //         //   // this.defaultExpandedRowKeys.push(item.id)
      //         //   console.log("打印this.defaultExpandedRowKeys",this.defaultExpandedRowKeys)
      //         // })
      //       } else {
      //         data = res.data
      //       }
      //       this.data = transformToTreeFormat({ key:'id', parentKey:'parId' },data)
      //       const pagination = { ...this.pagination }
      //       pagination.total = parseInt(res.data.total)
      //       pagination.current = this.queryParam.pageNum
      //       this.pagination = pagination
      //       this.loading = false
      //     })
      //   })
      // },
      refreshs () {
        const pagination = { ...this.pagination }
        pagination.current = 1
        this._getList()
      },

      //分页、排序、筛选变化时触
      handleTableChange (pagination, filters, sorter) {
        const pager = { ...this.pagination }
        // console.log('打印this.pagination', this.pagination)//total(数据总条数): 56  current(当前页数): 1
        pager.pageNum = pagination.current
        this.queryParam.pageNum = pager.pageNum
        this.pagination = pager
        this._getList()
      }
    }
  }
}
