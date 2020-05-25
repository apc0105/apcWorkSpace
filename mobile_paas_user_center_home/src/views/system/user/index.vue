<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户账号">
                <a-input v-model="queryParam.account" placeholder="请输入用户账号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户姓名">
                <a-input v-model="queryParam.name" placeholder="请输入用户姓名"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="手机号码">
                <a-input v-model="queryParam.mobile" placeholder="请输入手机号码"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('user:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('user:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('user:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('user:deleteMult')">删除</a-button>
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
            <a @click="handleEdit(record)" v-if="$permissionHandle('user:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('user:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getUserList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import { getUserList, deleteUserList } from '@/api/system/user/index'
const columns = [{
  dataIndex: 'account',
  key: 'account',
  title: '用户帐号'
}, {
  dataIndex: 'ruleName',
  key: 'ruleName',
  title: '角色名称'
}, {
  title: '部门名称',
  dataIndex: 'depId',
  key: 'depId'
}, {
  title: '用户姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '手机号码',
  dataIndex: 'mobile',
  key: 'mobile'
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
        account: '',
        mobile: '',
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
  created () {
    this._getUserList()
  },
  methods: {
    getList () {
      this._getUserList()
    },
    refresh () {
      this.queryParam.account = ''
      this.queryParam.name = ''
      this.queryParam.mobile = ''
      const pagination = { ...this.pagination }
      pagination.current = 1
      this._getUserList()
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.pageNo = pagination.current
      this.queryParam.pageNo = pager.pageNo - 1
      this.pagination = pager
      this._getUserList()
    },
    _getUserList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        getUserList(this.queryParam).then(res => {
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
            deleteUserList({ ids: JSON.stringify(that.deleteList) }).then(res => {
              that.selectedRowKeys = []
              that.deleteList = []
              if (res.retCode === 200) {
                that.$message.success(res.message)
                that._getUserList()
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
      this._getUserList()
    },
    handleAdd () {
      this.$refs.editModal.add()
      this.rows = ''
      this._getUserList()
    },
    onSelect (keys, node) {
      this.queryParamName = node.node.title
      this.queryParam.parId = keys[0]
      this.popover = false
    }
  }
}
</script>
