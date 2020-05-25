<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="标签名称">
                <a-input v-model="queryParam.param.name" placeholder="请输入标签名称"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="_getList">查询</a-button>
                <a-button type="primary" @click="handleAdd">新增</a-button>
                <a-button @click="refresh" >重置</a-button>
                <a-button @click="deleteMult" type="danger">删除</a-button>
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
        <span slot="state" slot-scope="text">
          <template v-if="text === '0'">禁用</template>
          <template v-if="text === '1'">启用</template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleDetail(record)">详情</a> -->
            <a-divider type="vertical" />
            <a @click="confirm(record.id)">删除</a>

            <!-- <a-divider type="vertical" />
            <a @click="handleResult(record)">考试结果</a> -->
          </template>
        </span>
      </a-table>
    </a-card>
    <notice ref="editModal" @getList="_getList" :record="record"/>
    <!-- <detail ref="editModal" /> -->
    <detail ref="detailModal" :record="record"></detail>
  </div>
</template>
<script>
import { getList, deleteResLabel } from '@/api/type'
import notice from './modules/edit'
import detail from './modules/detail'
// import result from './modules/result'
import mixins from '@/mixin/index'
const columns = [
  {
    dataIndex: 'iconName',
    key: 'iconName',
    title: '资料类型图标名称',
    fixed: 'left',
    width: 200
  },
  {
    dataIndex: 'iconPath',
    key: 'iconPath',
    title: '资料类型图标地址'
  },
  {
    dataIndex: 'state',
    key: 'state',
    title: '状态',
    scopedSlots: { customRender: 'state' }
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    notice,
    detail
  },
  data () {
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
          name: '',
          updateUser: 0,
          createUser: 0
        },
        sessionOrgId: 1,
        sessionUserId: 1,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    confirm (id) {
      // this.deleteList = []
      // this.deleteList.push(id)
      this.deleteMult(id)
    },
    deleteMult (id) {
      const that = this
      this.$confirm({
        title: '此操作将永久删除该数据, 是否继续?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          deleteResLabel({ id: id, updateUser: 0 }).then(res => {
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
    refresh () {
      this.queryParam.param.name = null
      this.form.resetFields()
      this.queryParam.pageNum = 1
      this.refreshs()
    },
    handleAdd () {
      this.$refs.editModal.add()
    },
    handleDetail (record) {
      this.record = record
      this.$refs.detailModal.details()
    },
    handleEdit (row) {
      this.record = row
      this.$refs.editModal.update()
    }
  },
  mixins: [mixins.list]
}
</script>
