<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form :form="form">
          <a-row :gutter="48" >
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
                label="车牌号">
                <a-input v-model="queryParam.carNum" placeholder="请输入车牌号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
                label="联系电话">
                <a-input v-model="queryParam.phone" placeholder="请输入联系电话"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
                label="联系人">
                <a-input v-model="queryParam.lineMan" placeholder="请输入联系人"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16, offset: 2 }">
                <a-button type="primary" @click="_getList" v-if="$permissionHandle('vehicleFamil:_getList')">查询</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('vehicleFamil:refresh')">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
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
            <a @click="handleEdit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)">删除</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { getList } from '@/api/vehicle/unfamiliar/index'
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
  title: '是否为小区常驻车辆',
  dataIndex: 'isResident',
  key: 'isResident',
  scopedSlots: { customRender: 'isResident' }
}, {
  title: '重点监控车辆',
  dataIndex: 'isKeyMonitoring',
  key: 'isKeyMonitoring',
  scopedSlots: { customRender: 'isKeyMonitoring' }
}]

export default {
  data () {
    return {
      loading: false,
      pagination: {},
      queryParam: {
        isResident: '0',
        phone: '',
        carNum: '',
        lineMan: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      data: [],
      columns
    }
  },
  created () {
    this._getList()
  },
  methods: {
    refresh () {
      this.queryParam.phone = ''
      this.queryParam.carNum = ''
      this.queryParam.lineMan = ''
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
        getList(this.queryParam).then(res => {
          this.data = res.data.content
          const pagination = { ...this.pagination }
          pagination.total = res.data.totalElements
          pagination.current = this.queryParam.pageNo + 1
          this.pagination = pagination
          this.loading = false
        })
      })
    }
  }
}
</script>
