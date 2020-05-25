<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="车牌号" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                <a-input v-model="queryParam.carNum" placeholder="请输入车牌号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="联系电话" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                <a-input v-model="queryParam.phone" placeholder="请输入联系电话"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="联系人" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                <a-input v-model="queryParam.lineMan" placeholder="请输入联系人"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="车牌颜色"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }">
                <a-select
                  style="width: 100%"
                  v-decorator="['licencePlateColour']"
                  placeholder="请选择车牌颜色"
                >
                  <a-select-option v-for="i in licenseColor" :key="i.key">{{ i.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="_getList" v-if="$permissionHandle('vehicleLibrary:_getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('vehicleLibrary:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('vehicleLibrary:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('vehicleLibrary:deleteMult')">删除</a-button>
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
        <template slot="isResident" slot-scope="text">
          <template v-if="text==='0'"><a-badge status="error" text="否" /></template>
          <template v-if="text==='1'"><a-badge status="success" text="是"/></template>
        </template>
        <template slot="isKeyMonitoring" slot-scope="text">
          <template v-if="text==='0'"><a-badge status="success" text="否" /></template>
          <template v-if="text==='1'"><a-badge status="error" text="是"/></template>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-if="$permissionHandle('vehicleLibrary:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('vehicleLibrary:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import { getList, deleteList, licencePlateColour } from '@/api/vehicle/vehicleLibrary/index'
const columns = [{
  dataIndex: 'residenceId',
  key: 'residenceId',
  title: '小区名称',
  scopedSlots: { customRender: 'residenceId' }
}, {
  title: '车牌号',
  dataIndex: 'carNum',
  key: 'carNum'
}, {
  title: '联系电话',
  dataIndex: 'phone',
  key: 'phone'
}, {
  title: '联系人',
  dataIndex: 'lineMan',
  key: 'lineMan'
}, {
  title: '车辆颜色',
  dataIndex: 'carColour',
  key: 'carColour'
}, {
  title: '车牌颜色',
  dataIndex: 'licencePlateColour',
  key: 'licencePlateColour'
}, {
  title: '是否为小区常驻车辆',
  dataIndex: 'isResident',
  key: 'isResident',
  scopedSlots: { customRender: 'isResident' }
}, {
  title: '重点监控车辆',
  dataIndex: 'isKeyMonitoring',
  key: 'isKeyMonitoring',
  scopedSlots: { customRender: 'isKeyMonitoring' }
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
      licenseColor: [],
      popover: false,
      rows: '',
      loading: false,
      deleteList: [],
      pagination: {},
      queryParam: {
        lineMan: '',
        licencePlateColour: '',
        phone: '',
        carNum: '',
        isKeyMonitoring: '1',
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
  computed: {
    rowSelection () {
      return {

      }
    }
  },
  created () {
    this._getList()
    this._licencePlateColour()
  },
  methods: {
    refresh () {
      this.queryParam.carNum = ''
      this.queryParam.phone = ''
      this.queryParam.lineMan = ''
      this.queryParam.licencePlateColour = ''
      this.form.resetFields()
      this.queryParam.pageNo = 0
      const pagination = { ...this.pagination }
      pagination.current = 1
      this._getList()
    },
    _licencePlateColour () {
      return new Promise((resolve, reject) => {
        licencePlateColour().then(res => {
          this.licenseColor = res.data
        })
      })
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
          this.queryParam.licencePlateColour = values.licencePlateColour
          getList(this.queryParam).then(res => {
            this.data = res.data.content
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
