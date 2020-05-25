<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="接口名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
                <a-select
                  placeholder="请输入接口名称"
                  v-decorator="[
                    'name'
                  ]">
                  <a-select-option v-for="i in options" :key="i.id">{{ i.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="接口状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
                <a-select
                  placeholder="请输入接口状态"
                  v-decorator="[
                    'inState'
                  ]">
                  <a-select-option v-for="i in status" :key="i.key">{{ i.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('post:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('post:handleAdd')">新增</a-button>
                <a-button @click="refresh">重置</a-button v-if="$permissionHandle('post:refresh')">
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('post:deleteMult')">删除</a-button>
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
        <template slot="inState" slot-scope="text">
          <template v-if="text === '0'"><a-badge status="default" text="未启用" /></template>
          <template v-if="text === '1'"><a-badge status="success" text="启用" /></template>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-if="$permissionHandle('post:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('post:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import { getList, deleteList, findTree } from '@/api/system/post/index'
const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: '接口名称',
  scopedSlots: { customRender: 'name' }
}, {
  title: '接口路径',
  dataIndex: 'inAddress',
  key: 'inAddress'
}, {
  title: '接口状态',
  dataIndex: 'inState',
  key: 'inState',
  scopedSlots: { customRender: 'inState' }
}, {
  title: '请求方式',
  dataIndex: 'requestMode',
  key: 'requestMode'
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
      options: [],
      status: [],
      popover: false,
      rows: '',
      loading: false,
      deleteList: [],
      pagination: {},
      queryParam: {
        name: '',
        inState: '',
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
    this._getList()
    this._findTree()
  },
  methods: {
    _findTree () {
      return new Promise((resolve, reject) => {
        findTree().then(res => {
          this.options = res.data
        })
      })
    },
    getList () {
      this._getList()
    },
    refresh () {
      this.queryParam.name = ''
      this.queryParam.inState = ''
      this.form.resetFields()
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
    _getList () {
      this.loading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.queryParam.name = values.name
          this.queryParam.inState = values.inState
          getList(this.queryParam).then(res => {
            this.data = res.data.content
            this.status = res.param.inState
            const pagination = { ...this.pagination }
            pagination.total = res.data.totalElements
            pagination.current = this.queryParam.pageNo + 1
            this.pagination = pagination
            this.loading = false
          })
        }
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
