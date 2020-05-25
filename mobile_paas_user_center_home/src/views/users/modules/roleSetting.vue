<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleRoles"
    @cancel="handleCancel"
    destroyOnClose>
    <div class="table-page-search-wrapper">
      <a-form
        layout="inline"
        :form="form">
        <a-row :gutter="48">
          <a-col
            :md="8"
            :sm="24">
            <a-form-item label="角色名称">
              <a-input
                v-model="queryParam.param.name"
                placeholder="请输入角色名称"/>
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24">
            <a-form-item label="订购服务">
              <a-select
                placeholder="请选择订购的服务"
                v-model="queryParam.param.serverId">
                <a-select-option v-for="item,index in appData" :key="item.appCode" :value="item.appCode">{{ item.appName
                }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item>
              <a-button
                type="primary"
                @click="_getList">查询
              </a-button>
              <a-button @click="refresh">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      :loading="loading"
      @change="handleTableChange"
      :pagination="pagination"
      :rowSelection="{ selectedRowKeys: selectedRowKeys,
                       onChange: onSelectChange,
                       onSelect: selectEvent,
                       onSelectAll: onSelectAll,
                       getCheckboxProps:getCheckboxProps }"
      :columns="columns"
      :rowKey="showRecord"
      :dataSource="data">
      <span
        slot="enableState"
        slot-scope="text, record">
        <template v-if="record.enableState === '0'">不启用</template>
        <template v-if="record.enableState === '1'">启用</template>
      </span>

      <span
        slot="createTime"
        slot-scope="text, record">
        <template>{{ $moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}</template>
      </span>
    </a-table>

  </a-modal>
</template>

<script>
import { getList, bindingRoles, userRoles } from '@/api/role'
import { getApplyMessages } from '@/api/classify'

const columns = [{
  title: '角色名称',
  dataIndex: 'name',
  key: 'name'
}, {
  dataIndex: 'createdName',
  key: 'createdName',
  title: '创建人'
}, {
  dataIndex: 'enableState',
  key: 'enableState',
  title: '是否启用',
  scopedSlots: { customRender: 'enableState' }
}, {
  title: '备注',
  dataIndex: 'roleDesc',
  key: 'roleDesc'
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime',
  scopedSlots: { customRender: 'createTime' }
}]
export default {
  mounted () {

  },
  props: {
    record: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: false,
      maskClosable: false,
      title: '',
      visible: false,
      popover: false,
      params: {},
      confirmLoading: false,
      value: '',
      queryParam: {
        pageSize: 10,
        pageNum: 1,
        param: {
          name: '',
          serverId: '',
          orgId: ''
        }
      },
      selectedRowKeys: [0],
      selectedRows: [],
      columns,
      appData: [],
      deleteList: [],
      pagination: {
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true
      },
      userRoleList: []
    }
  },
  created () {
    console.log('created')
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '角色配置'
        this.queryParam.param.orgId = this.record.orgId
        console.log('init')
        this.getUserRoles()
        this._getList()
        this.getApplyMessages()
      })
    },
    handleRoles () {
      // if (this.deleteList.length === 0) {
      //   this.$message.error('请选择角色')
      //   return
      // }
      return new Promise((resolve, reject) => {
        this.params.roles = this.deleteList
        this.params.userId = this.record.id
        bindingRoles(this.params).then(res => {
          this.success(res)
        })
      })
    },
    success (res) {
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 200)
      if (res.retCode === 200) {
        this.deleteList = []
        this.selectedRows = []
        this.userRoleList = []
        // 清空选中的key
        this.selectedRowKeys = []
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    handleCancel () {
      this.deleteList = []
      this.selectedRows = []
      this.userRoleList = []
      this.visible = false
    },
    refresh () {
      this.queryParam.param.name = ''
      this.queryParam.param.serverId = ''
      this.queryParam.pageNum = 1
      this._getList()
    },
    _getList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        getList(this.queryParam).then(res => {
          this.data = res.data.list
          const pagination = { ...this.pagination }
          pagination.total = Number(res.data.total)
          pagination.current = this.queryParam.pageNum + 1
          this.pagination = pagination
          this.loading = false
        })
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * 复选框点击事件
     */
    selectEvent (record, selected) {
      if (selected) {
        this.deleteList.push(record.id)
      } else {
        this.deleteList = this.deleteList.filter(item => item !== record.id)
      }
    },
    /**
     * 全选事件
     */
    onSelectAll (selected, selectedRows, changeRows) {
      if (selected) {
        const addRows = changeRows.filter(item => {
          return this.deleteList.every(val => item.id !== val)
        })
        addRows.forEach(item => {
          this.deleteList.push(item.id)
        })
      } else { // 全不选的基础是全选，不用判断是否存在，直接删除
        this.deleteList = this.deleteList.filter(item => {
          return changeRows.every(val => item !== val.id)
        })
      }
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.pageNumber = pagination.current
      this.queryParam.pageNum = pagination.current - 1
      this.queryParam.pageSize = pagination.pageSize
      this.pagination = pager
      this._getList()
    },
    showRecord (record, index) {
      return record.id
    },
    // 获取订购的服务
    getApplyMessages () {
      const id = JSON.parse(window.localStorage.message).id
      getApplyMessages(`/cfgAppOrder/findAppbyUserId/${id}`).then(res => {
        const { message, retCode, data } = res
        if (retCode === 200) {
          this.appData = data
        } else {
          this.$message.error(message)
        }
      })
    },
    getUserRoles () {
      userRoles({
        id: this.record.id
      }).then(res => {
        const { message, retCode, data } = res
        if (retCode === 200) {
          this.userRoleList = data
          this.deleteList = this.userRoleList.map(item => {
            return item.id
          })
        } else {
          this.$message.error(message)
        }
      })
    },
    getCheckboxProps (record) {
      console.log('record', record)
      console.log('userrolelist', this.userRoleList)
      return ({
        defaultChecked: this.userRoleList.some(item => item.id === record.id),
        props: {
          defaultChecked: this.userRoleList.some(item => item.id === record.id)
        }
      })
    }
  }
}
</script>
