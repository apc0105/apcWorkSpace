<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="角色名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 14 }">
                <a-input
                  v-model="queryParam.name"
                  placeholder="请输入角色名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('role:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('role:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('role:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('role:deleteMult')">删除</a-button>
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
        <template slot="isaccredit" slot-scope="text">
          <template v-if="text === '1'">已授权</template>
          <template v-if="text === '2'">未授权</template>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleAuth(record)" v-if="$permissionHandle('role:handleAuth')">授权</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-if="$permissionHandle('role:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('role:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
      <auth ref="authModel" :rowss="rows"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import auth from './modules/auth'
import { getList, deleteList, roleList } from '@/api/system/role/index'
const columns = [{
  title: '角色名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '角色描述',
  dataIndex: 'descr',
  key: 'descr'
}, {
  title: '是否授权',
  dataIndex: 'isaccredit',
  key: 'isaccredit',
  scopedSlots: { customRender: 'isaccredit' }
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: {
    edit,
    auth
  },
  data () {
    return {
      popover: false,
      rows: '',
      loading: false,
      deleteList: [],
      roles: [],
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
      columns
    }
  },
  created () {
    this._getList()
    this.getRoleList()
  },
  methods: {
    handleAuth (row) {
      this.rows = row.id
      this.$refs.authModel.add()
    },
    getList () {
      this._getList()
    },
    getRoleList () {
      return new Promise((resolve, reject) => {
        roleList().then(res => {
          this.roles = res.data
        })
      })
    },
    refresh () {
      this.queryParam.name = ''
      const pagination = { ...this.pagination }
      pagination.current = 1
      this.form.resetFields()
      this._getList()
    },
    handleTableChange (pagination, filters, sorter) {
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
      if (this.deleteList.length) {
        const that = this
        this.$confirm({
          title: '此操作将永久删除该数据, 是否继续?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            deleteList({ ids: JSON.stringify(that.deleteList) }).then(res => {
              that.selectedRowKeys = []
              that.deleteList = []
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
      this.$refs.editModal.add()
      this.rows = ''
      this._getList()
    },
    onSelect (keys, node) {
      this.queryParamName = node.node.title
      this.queryParam.parId = keys[0]
      this.popover = false
    }
  }
}
</script>
