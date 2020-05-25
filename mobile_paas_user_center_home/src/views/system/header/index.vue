<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="年份">
                <a-input v-model="queryParam.year" placeholder="请输入年份"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <!-- <a-form-item label="参数编码">
                <a-input v-model="queryParam.code" placeholder="请输入参数编码"/>
              </a-form-item> -->
              <a-form-item label="项目类型">
                <a-select
                  placeholder="请选择项目类型"
                  v-model="queryParam.proType"
                >
                  <a-select-option v-for="item in option" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('header:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('header:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('header:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('header:deleteMult')">删除</a-button>
                <a-button type="primary" @click="copy" v-if="$permissionHandle('header:copy')">复制</a-button>
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
        <template slot="proType" slot-scope="text">
          <template v-if="text === '1'">集中采购项目</template>
          <template v-if="text === '2'">自行采购项目</template>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleParam(record)" v-if="$permissionHandle('header:handleParam')">表头配置 </a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-if="$permissionHandle('header:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('header:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
      <paramConfig
        ref="paramConfig"
        :rowss="rows"
        :proTypess="proTypes"
        :yearss="years"
        :tableNamess="tableNames"
        @getList="_getList"/>
      <paramCopy ref="paramCopy" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import paramConfig from './modules/paramConfig'
import paramCopy from './modules/paramCopy'
import { getList, deleteLists } from '@/api/system/header/index'
const columns = [{
  dataIndex: 'year',
  key: 'year',
  title: '年份'
  // scopedSlots: { customRender: 'year' }
}, {
  title: '物理表名称',
  dataIndex: 'tableName',
  key: 'tableName'
}, {
  title: '项目类型',
  dataIndex: 'proType',
  key: 'proType',
  scopedSlots: { customRender: 'proType' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
  width: '300px'
}]

export default {
  components: {
    edit,
    paramConfig,
    paramCopy
  },
  data () {
    return {
      popover: false,
      rows: '',
      proTypes: '',
      years: '',
      tableNames: '',
      loading: false,
      deleteList: [],
      pagination: {},
      queryParam: {
        year: '',
        proType: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      treeData: [],
      data: [],
      selectedRowKeys: [],
      columns,
      option: [
        { id: '1', name: '集中采购项目' },
        { id: '2', name: '自行采购项目' }
      ]
    }
  },
  created () {
    this._getList()
  },
  methods: {
    handleParam (row) {
      this.rows = row.id
      this.proTypes = row.proType
      this.years = row.year
      this.tableNames = row.tableName
      this.$refs.paramConfig.handleAdd()
    },
    getList () {
      this._getList()
    },
    refresh () {
      this.queryParam.year = ''
      this.queryParam.proType = ''
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
            deleteLists({ ids: JSON.stringify(that.deleteList) }).then(res => {
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
    copy () {
      this.$refs.paramCopy.add()
    }
  }
}
</script>
