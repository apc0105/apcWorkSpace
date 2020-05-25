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
              <a-form-item label="姓名">
                <a-input
                  v-model="queryParam.param.name"
                  placeholder="请输入姓名"/>
              </a-form-item>
            </a-col>
            <a-col
              :md="8"
              :sm="24">
              <a-form-item label="账号">
                <a-input
                  v-model="queryParam.param.account"
                  placeholder="请输入账号"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button
                  type="primary"
                  @click="_getList">查询
                </a-button>
                <tb-per code="users.add">
                  <a-button
                    type="primary"
                    @click="handleAdd">新增
                  </a-button>
                </tb-per>
                <a-button @click="refresh">重置</a-button>
                <a-button
                  @click="deleteMult"
                  type="danger">删除
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div><!-- @change触发 分页、排序、筛选变化时触发   total(数据总条数): 56  current(当前页数): 1  pageSize 每个页面显示的数据条数-->
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :scroll="{ x: 1200 }"
        rowKey="id"
        :dataSource="data">
        <span
          slot="action"
          slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="此操作将重置密码，确定重置?"
              @confirm="confirms(record)"
              okText="重置"
              cancelText="取消">
              <a href="#">密码重置</a>
            </a-popconfirm>
            <!-- <a @click="handleReset(record)">密码重置</a> -->
            <!-- <a-divider type="vertical" />
            <a @click="handleDetail(record)">详情</a>-->
            <a-divider type="vertical"/>
            <a @click="confirm(record.id)">删除</a>

            <a-divider type="vertical"/>
            <a @click="handleRole(record)" v-if="record.userRole=='1'">角色配置</a>
          </template>
        </span>
      </a-table>
    </a-card>
    <!-- 点击修改时，执行Updata -->
    <notice
      ref="editModal"
      @getList="_getList"
      :record="record"
      :orgId="orgId"/>
    <!-- <notice ref="editModal" @getList="_usergetList" :record="record"/> -->
    <!-- <detail ref="editModal" /> -->
    <detail
      ref="detailModal"
      :record="record"></detail>

    <role-setting
      ref="roleModal"
      :record="record"></role-setting>
  </div>
</template>
<script>
  import {getList, release, deleteLists, pwdReset} from '@/api/classify'
  import notice from './modules/edit'
  import detail from './modules/detail'
  import roleSetting from './modules/roleSetting'

  // import result from './modules/result'
  import mixins from '@/mixin/index'

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: '姓名',
      fixed: 'left',
      width: 100
    },
    {
      dataIndex: 'depName',
      key: 'depName',
      title: '部门'
    },
    {
      dataIndex: 'account',
      key: 'account',
      title: '账号'
    },
    {
      dataIndex: 'phone',
      key: 'phone',
      title: '手机号',
      scopedSlots: {customRender: 'phone'}
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'email'
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      scopedSlots: {customRender: 'action'}
    }
  ]
  export default {
    // created () {
    //   this.record = JSON.parse(window.localStorage.message)
    //   console.log('打印用户orgId', this.record)
    // },
    mounted() {
      console.log('打印用户信息', JSON.parse(window.localStorage.message))
      this.orgId = JSON.parse(window.localStorage.message).orgId
    },
    components: {
      notice,
      detail,
      roleSetting
    },
    data() {
      return {
        deleteList: [],
        params: {},
        request: getList,
        columns,
        record: {},
        data: [],
        form: this.$form.createForm(this),
        queryParam: {
          param: {
            userRole: '1'
          },
          pageSize: 10,
          pageNum: 1
        },
        orgId: ''
      }
    },
    methods: {
      confirm(id) {
        this.deleteMult(id)
      },
      confirms(row) {
        pwdReset({id: row.id}).then(res => {
          if (res.retCode === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      deleteMult(id) {
        const that = this
        this.$confirm({
          title: '此操作将永久删除该数据, 是否继续?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            deleteLists(id).then(res => {
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
      },
      _release(record) {
        var url = this.$UPLOAD_URL.UPLOAD_URL + 'notice/push/' + record.id
        release(url).then(res => {
          if (res.retCode === 200) {
            this.$message.success(res.message)
            this._getList()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      refresh() {
        this.queryParam.param = {}
        this.form.resetFields()
        this.queryParam.pageNum = 1
        this.refreshs()
      },
      handleAdd() {
        this.$refs.editModal.add()
      },
      handleDetail(record) {
        this.record = record
        this.$refs.detailModal.details()
      },
      handleEdit(row) {
        this.record = row
        console.log('打印record', this.record)
        this.$refs.editModal.update()
      },
      handleRole(row) {
        this.record = row
        console.log('打印record', this.record)
        this.$refs.roleModal.init()
      }
    },
    mixins: [mixins.list]
  }
</script>
