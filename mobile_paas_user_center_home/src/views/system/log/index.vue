<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="记录时间">
                <a-date-picker
                  @change="changeDate"
                  placeholder="请选择记录时间"
                  v-decorator="[
                    'loginTime',
                  ]"
                />
                </a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item
                label="ip地址"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="[
                    'loginIp',
                  ]"
                  placeholder="请输入ip地址"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item
                label="用户账号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="[
                    'account',
                  ]"
                  placeholder="请输入用户账号"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item
                label="日志类型"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
                <a-select
                  placeholder="请选择日志类型"
                  v-decorator="[
                    'logType',
                  ]"
                >>
                  <a-select-option v-for="item in option" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('log:getList')">查询</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('log:refresh')">重置</a-button>
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
        <template slot="logType" slot-scope="text">
          <template v-if="text === '1'">登录日志</template>
          <template v-if="text === '2'">操作日志</template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { getList } from '@/api/system/log/index'
const columns = [{
  dataIndex: 'loginTime',
  key: 'loginTime',
  title: '时间',
  scopedSlots: { customRender: 'loginTime' }
}, {
  title: 'IP',
  dataIndex: 'loginIp',
  key: 'loginIp'
}, {
  title: '用户账号',
  dataIndex: 'account',
  key: 'account'
}, {
  title: '日志类型',
  key: 'logType',
  dataIndex: 'logType',
  scopedSlots: { customRender: 'logType' }
}, {
  title: '操作内容',
  dataIndex: 'operateContent',
  key: 'operateContent'
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime'
}]

export default {
  data () {
    return {
      option: [
        { id: '1', name: '登录日志' },
        { id: '2', name: '操作日志' }
      ],
      popover: false,
      rows: '',
      loading: false,
      deleteList: [],
      pagination: {},
      queryParam: {
        loginTime: '',
        loginIp: '',
        account: '',
        logType: '',
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
    changeDate (data, dateString) {
      this.queryParam.loginTime = dateString
    },
    getList () {
      this._getList()
    },
    refresh () {
      this.queryParam.loginIp = ''
      this.queryParam.account = ''
      this.queryParam.logType = ''
      this.queryParam.loginTime = ''
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
        // console.log(this.queryParam.loginTime)
        // this.queryParam.loginTime = moment(this.queryParam.loginTime._d).format('YYYY-MM-DD')
        const { form: { validateFields } } = this
        validateFields((errors, values) => {
          // getList({ loginTime: this.queryTime, loginIp: values.loginIp, account: values.account, logType: values.logType }).then(res => {
          this.queryParam.loginIp = values.loginIp
          this.queryParam.account = values.account
          this.queryParam.logType = values.logType
          getList(this.queryParam).then(res => {
            this.data = res.data.content
            const pagination = { ...this.pagination }
            pagination.total = res.data.totalElements
            pagination.current = this.queryParam.pageNo + 1
            this.pagination = pagination
            this.loading = false
          })
        })
      })
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
