<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper" style="margin-bottom:10px;">
        <a-button @click="bids" v-if="$permissionHandle('extract:bids')">招标代理机构抽取</a-button>
        <a-button @click="cost" v-if="$permissionHandle('extract:cost')">造价审核机构抽取</a-button>
      </div>
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :scroll="{x:1000}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data">
        <span slot="state" slot-scope="text, record">
          <template v-if="record.state === '0'">未确认</template>
          <template v-if="record.state === '1'">参加</template>
          <template v-if="record.state === '2'">不参加</template>
        </span>
        <span slot="type" slot-scope="text, record">
          <template v-if="record.type === '1'">招标代理机构</template>
          <template v-if="record.type === '2'">造价审核机构</template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <template v-if="record.state === '1'">
              <a @click="handleDetail(record)" v-if="$permissionHandle('extract:handleDetail')">打印</a>
              <a-divider type="vertical" />
            </template>
            <!-- <a-popconfirm
              title="是否参加?"
              @confirm="confirms"
              @cancel="cancel"
              okText="是"
              cancelText="否"
            > -->
            <a @click="confirms(record)" v-if="$permissionHandle('extract:confirms')">是否参加</a>
            <!-- </a-popconfirm> -->
            <template v-if="record.state === '2'">
              <a-divider type="vertical" />
              <a @click="_extract(record)" v-if="$permissionHandle('extract:_extract')">重新抽取</a>
            </template>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('extract:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <bids ref="bidsModal" :type="type" @_getList="_getList"/>
      <!-- 招标代理机构 -->
      <bidsTable ref="bidsTableModal" :id="id"/>
      <!-- 造价审核机构 -->
      <costTable ref="costTableModal" :printData="printData"/>
      <cost ref="costModal" :type="types" @_getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import bids from './modules/bids'
import cost from './modules/cost'
import bidsTable from './modules/bidsTable'
import costTable from './modules/costTable'
import { getList, changeType, extract, reExtract, deleteList } from '@/api/supplier/extract/index'
import mixins from '@/mixin/index'
const columns = [
  {
    dataIndex: 'createTime',
    key: 'createTime',
    title: '项目名称',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    dataIndex: 'biddingId',
    key: 'biddingId',
    title: '机构名称',
    scopedSlots: { customRender: 'biddingId' }
  }, {
    dataIndex: 'state',
    key: 'state',
    title: '跟进状态',
    scopedSlots: { customRender: 'state' }
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 260,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    bids,
    bidsTable,
    costTable,
    cost
  },
  data () {
    return {
      id: '',
      type: '1',
      types: '2',
      loading: false,
      request: getList,
      deleteLists: deleteList,
      pagination: {},
      queryParam: {
        pageSize: 10,
        pageNo: 0
      },
      data: [],
      selectedRowKeys: [],
      columns,
      proId: '',
      printData: {},
      deleteList: []
    }
  },
  // created () {
  //   this._getList()
  // },
  methods: {
    // _confirm (id) {
    //   this.deleteList = []
    //   this.deleteList.push(id)
    //   this.deleteMult()
    // },
    // // 删除多个
    // deleteMult () {
    //   if (this.deleteList.length !== 0) {
    //     const that = this
    //     this.$confirm({
    //       title: '此操作将永久删除该数据, 是否继续?',
    //       okText: '确定',
    //       okType: 'danger',
    //       cancelText: '取消',
    //       onOk () {
    //         deleteList({ ids: JSON.stringify(that.deleteList) }).then(res => {
    //           that.selectedRowKeys = []
    //           if (res.retCode === 200) {
    //             that.$message.success(res.message)
    //             that._getList()
    //           } else {
    //             that.$message.error(res.message)
    //           }
    //         })
    //       }
    //     })
    //   } else {
    //     this.$message.error('请至少选择一条要删除的数据')
    //   }
    // },
    _extract (row) {
      return new Promise((resolve, reject) => {
        extract({ type: row.type, proName: row.proId }).then(res => {
          this._reExtract(row.id, res.data.id)
          this._getList()
        })
      })
    },
    _reExtract (id, biddingId) {
      return new Promise((resolve, reject) => {
        reExtract({ id: id, biddingId: biddingId }).then(res => {
        })
      })
    },
    // isJoin (row) {
    //   row.id = row.id
    // },
    confirms (row) {
      if (row.state === '0') {
        this._changeType(row.id, 1)
      } else if (row.state === '1') {
        this._changeType(row.id, 2)
      } else if (row.state === '2') {
        this._changeType(row.id, 1)
      }
    },
    _changeType (id, state) {
      return new Promise((resolve, reject) => {
        changeType({ id: id, state: state }).then(res => {
          this._getList()
        })
      })
    },
    handleDetail (row) {
      this.id = row.id
      if (row.type === '1') {
        this.$refs.bidsTableModal.open()
      }
      if (row.type === '2') {
        this.$refs.costTableModal.open()
      }
    },
    bids () {
      this.$refs.bidsModal.open()
    },
    cost () {
      this.$refs.costModal.open()
    },
    getList () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this._getList()
        }
      })
    }
    // handleTableChange (pagination, filters, sorter) {
    //   const pager = { ...this.pagination }
    //   pager.pageNo = pagination.current
    //   this.queryParam.pageNo = pager.pageNo - 1
    //   this.pagination = pager
    //   this._getList()
    // }
    // _getList () {
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     getList(this.queryParam).then(res => {
    //       this.data = res.data.content
    //       const pagination = { ...this.pagination }
    //       pagination.total = res.data.totalElements
    //       pagination.current = this.queryParam.pageNo + 1
    //       this.pagination = pagination
    //       this.loading = false
    //     })
    //   })
    // },
    // onSelectChange (selectedRowKeys, selectedRows) {
    //   this.selectedRowKeys = selectedRowKeys
    //   this.deleteList = []
    //   selectedRows.forEach(val => {
    //     this.deleteList.push(val.id)
    //   })
    // }
  },
  mixins: [mixins.list]
}
</script>
