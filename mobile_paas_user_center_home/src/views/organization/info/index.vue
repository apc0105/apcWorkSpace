<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.name" placeholder="请输入名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="类型">
                <a-select
                  style="width: 100%"
                  v-decorator="['type']"
                  placeholder="请选择类型">
                  <a-select-option value="1">招标代理机构</a-select-option>
                  <a-select-option value="2">造价审核机构</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="联系人">
                <a-input v-model="queryParam.linkMan" placeholder="请输入联系人"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="经营范围">
                <a-input v-model="queryParam.range" placeholder="请输入经营范围"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('dep:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('dep:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('dep:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('dep:deleteMult')">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :scroll="{x:1500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data">
        <span slot="type" slot-scope="text, record">
          <template v-if="record.type === '1'">招标代理机构</template>
          <template v-if="record.type === '2'">造价审核机构</template>
        </span>
        <span slot="state" slot-scope="text, record">
          <template v-if="record.state === '1'"> <a-badge status="success" text="有效" /></template>
          <template v-if="record.state === '0'"><a-badge status="processing" text="无效" /></template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">详细</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-if="$permissionHandle('dep:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('dep:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
      <detail ref="detailModal" :rowss="rows" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import detail from './modules/details'
import { getList, deleteList } from '@/api/organ/info/index'
const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: '名称',
  scopedSlots: { customRender: 'name' }
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
  scopedSlots: { customRender: 'type' }
}, {
  dataIndex: 'linkMan',
  key: 'linkMan',
  title: '联系人',
  scopedSlots: { customRender: 'linkMan' }
}, {
  title: '联系电话',
  dataIndex: 'linkTel',
  key: 'linkTel'
}, {
  title: '资质情况',
  key: 'aptitude',
  dataIndex: 'aptitude'
}, {
  title: '机构状态',
  dataIndex: 'state',
  key: 'state',
  scopedSlots: { customRender: 'state' }
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime',
  scopedSlots: { customRender: 'createTime' }
}, {
  title: '操作',
  key: 'action',
  fixed: 'right',
  width: 150,
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: {
    edit,
    detail
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
        type: '',
        linkMan: '',
        range: '',
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
  },
  methods: {
    getList () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam.type = values.type
          this._getList()
        }
      })
    },
    handleDetail (row) {
      this.rows = row.id
      this.$refs.detailModal.details()
      this._getList()
    },
    refresh () {
      this.queryParam.name = ''
      this.queryParam.type = ''
      this.queryParam.range = ''
      this.queryParam.linkMan = ''
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
