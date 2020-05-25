<template>
  <div>
    <a-card>
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
                  placeholder="请输入角色名称" />
              </a-form-item>
            </a-col>
            <a-col
              :md="8"
              :sm="24">
              <a-form-item label="订购服务">
                <a-select
                  placeholder="请选择订购的服务"
                  v-model="queryParam.param.serverId" >
                  <a-select-option v-for="item,index in appData" :key="item.appCode" :value="item.appCode">{{ item.appName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button
                  type="primary"
                  @click="_getList">查询</a-button>
                <a-button
                  type="primary"
                  @click="handleAdd">新增</a-button>
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
        :rowKey="showRecord"
        :columns="columns"
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
        <!-- v-if="$auth('table.delete')" -->
        <span
          slot="action"
          slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
          </template>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="auth(record)">授权角色</a>
              </a-menu-item>
              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="confirm(record.id)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
      <edit
        ref="editModal"
        :record="rows"
        @getList="_getList" />
      <auth
        ref="authModal"
        :record="rows"
        @getList="_getList" />
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import auth from './modules/auth'
import mixins from '@/mixin/servIndex'
import { axios } from '@/utils/request'
import { getList, deleteList } from '@/api/role'
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
      id: '',
      axios: axios,
      request: getList,
      deleteLists: deleteList,
      popover: false,
      rows: {},
      loading: false,
      deleteList: [],
      queryParam: {
        pageSize: 10,
        pageNum: 1,
        param: {
          name: '',
          serverId: ''
        }
      },
      form: this.$form.createForm(this),
      data: [],
      selectedRowKeys: [],
      columns,
      appData: []
    }
  },
  created () {
    this.getApplyMessages()
  },
  methods: {
    auth (row) {
      this.rows = row
      this.$refs.authModal.add()
      this._getList()
    },
    handleEdit (row) {
      this.rows = row
      this.$refs.editModal.update()
      this._getList()
    },
    handleAdd () {
      this.$refs.editModal.add()
      this.rows = {}
      this._getList()
    },
    refresh () {
      this.queryParam.param.name = ''
      this.queryParam.param.serverId = ''
      this.queryParam.pageNum = 1
      this._getList()
    },
    // 获取订购的服务
    getApplyMessages () {
      const orgId = JSON.parse(window.localStorage.message).orgId
      getApplyMessages(`/cfgApp/findAllByIsAuth/${orgId}`).then(res => {
        const { message, retCode, data } = res
        if (retCode === 200) {
          this.appData = data
        } else {
          this.$message.error(message)
        }
      })
    }
  },
  mixins: [mixins]
}
</script>
