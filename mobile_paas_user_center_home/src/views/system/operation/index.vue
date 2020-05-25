<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="操作名称">
                <a-input v-model="queryParam.name" placeholder="请输入操作名称"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('operation:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('operation:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('operation:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('operation:deleteMult')">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-if="$permissionHandle('operation:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('operation:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import { getList, deleteList } from '@/api/system/operation/index'
const columns = [{
  title: '所属资源',
  dataIndex: 'resId',
  key: 'resId'
}, {
  dataIndex: 'name',
  key: 'name',
  title: '操作名称',
  scopedSlots: { customRender: 'name' }
}, {
  title: '操作编码',
  dataIndex: 'code',
  key: 'code'
}, {
  title: '链接地址',
  dataIndex: 'url',
  key: 'url'
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime',
  scopedSlots: { customRender: 'createTime' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: {
    edit
  },
  data () {
    return {
      popover: false,
      rows: '',
      loading: false,
      deleteList: [],
      pagination: {},
      queryParam: {
        name: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      treeData: [],
      data: [],
      selectedRowKeys: [],
      columns,
      queryParamName: ''
    }
  },
  computed: {
    rowSelection () {
      return {

      }
    }
  },
  created () {
    this._getList()
  },
  methods: {
    getList () {
      this._getList()
    },
    refresh () {
      this.queryParam.name = ''
      this.queryParam.pageNo = 0
      const pagination = { ...this.pagination }
      pagination.current = 1
      this._getList()
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.pageNo = pagination.current
      this.queryParam.pageNo = pager.pageNo - 1
      this.pagination = pager
      this._getList()
    },
    _getList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        getList(this.queryParam).then(res => {
          this.data = res.data.content
          const pagination = { ...this.pagination }
          pagination.total = res.data.totalElements
          pagination.current = this.queryParam.pageNo + 1
          this.pagination = pagination
          this.loading = false
        })
      })
    },
    confirm (id) {
      this.deleteList = []
      this.deleteList.push(id)
      this.deleteMult()
    },
    // 删除多个
    deleteMult () {
      if (this.deleteList.length !== 0) {
        const that = this
        this.$confirm({
          title: '此操作将永久删除该数据, 是否继续?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            deleteList({ ids: JSON.stringify(that.deleteList) }).then(res => {
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
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.deleteList = []
      selectedRows.forEach(val => {
        this.deleteList.push(val.id)
      })
    },
    handleEdit (row) {
      this.rows = row.id
      this.$refs.editModal.update()
      this._getList()
    },
    handleAdd () {
      this.rows = ''
      this.$refs.editModal.add()
    },
    onSelect (keys, node) {
      this.queryParamName = node.node.title
      this.queryParam.parId = keys[0]
      this.popover = false
    }
  }
}
</script>
