<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline"
                :form="form">
          <a-row :gutter="48">
            <a-col :md="8"
                   :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.param.depName"
                         placeholder="请输入名称" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary"
                          @click="_getList">查询</a-button>
                <a-button type="primary"
                          @click="handleAdd">新增</a-button>
                <a-button @click="refresh">重置</a-button>
                <a-button @click="deleteMult"
                          type="danger">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :loading="loading"
               @change="handleTableChange"
               :pagination="pagination"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :columns="columns"
               rowKey="id"
               :dataSource="data"
               :defaultExpandedRowKeys="defaultExpandedRowKeys">
        <span slot="action"
              slot-scope="text, record">
          <template>
            <!-- rowKey报错，绑定唯一的id   defaultExpandAllRows 默认展开的行 -->
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
    <notice ref="editModal"
            @getList="_getList"
            :record="record" />
    <!-- <detail ref="editModal" /> -->
    <detail ref="detailModal"
            :record="record"></detail>
  </div>
</template>
<script>
import { getList, release, deleteLists } from '@/api/dep'
import notice from './modules/edit'
import detail from './modules/detail'
import { transform } from '@/utils/trans'

// import result from './modules/result'
import mixins from '@/mixin/index'
const columns = [
  {
    dataIndex: 'depName',
    key: 'depName',
    title: '名称',
    width: 200
  }, {
    dataIndex: 'depDesc',
    key: 'depDesc',
    title: '备注'
  },
  {
    dataIndex: 'depCode',
    key: 'depCode',
    title: '部门编码'
  },
  {
    dataIndex: 'operationTime',
    key: 'operationTime',
    title: '创建时间'
  }, {
    title: '操作',
    key: 'action',
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
      defaultExpandedRowKeys: ['61515454512121'],//默认展开的行 '1','2','3','1244132082641272832'
      deleteList: [],
      params: {},
      request: getList,
      columns,
      record: {},
      data: [],
      form: this.$form.createForm(this),
      queryParam: {
        param: {
          depName: ''
        },
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    // created () {
    //   if (!this.data) {
    //     this.data.forEach(item => {
    //       // console.log(item.operationTime)
    //       const string = item.operationTime
    //       const stringYear = string.slice(0, 4)
    //       const stringMounth = string.slice(4, 6)
    //       const stringDay = string.slice(6, 8)
    //       const stringHour = string.slice(8, 10)
    //       const stringMin = string.slice(10, 12)
    //       const stringSe = string.slice(12)
    //       item.operationTime = stringYear + '-' + stringMounth + '-' + stringDay + ' ' + stringHour + ':' + stringMin + ':' + stringSe
    //     })
    //   }
    // },
    // getcolumnId(){
    //   console.log(data)
    //   data.forEach((item,index)=>{
    //     console.log('打印我进来了',1)
    //     //遍历得到的数据，将id项装进defaultExpandedRowKeys数组
    //     this.defaultExpandedRowKeys[index]=item.id
    //     // this.defaultExpandedRowKeys.push(item.id)
    //     console.log("打印this.defaultExpandedRowKeys",this.defaultExpandedRowKeys)
    //   })
    // },
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
    refresh () {
      this.queryParam.param.depName = ''
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
