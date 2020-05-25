<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form :form="form">
          <a-row :gutter="48" >
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                label="所属小区">
                <a-select
                  placeholder="请选择所属小区"
                  @change="handleChange"
                  v-decorator="[
                    'residenceId',
                  ]"
                >
                  <a-select-option v-for="item in option" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                label="所属设备">
                <a-select
                  placeholder="请选择所属设备"
                  v-decorator="[
                    'equipmentId',
                  ]">
                  <a-select-option v-for="item in allAllPlot" :key="item.deviceId">{{ item.deviceName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  label="车牌号">
                  <a-input v-model="queryParam.carNum" placeholder="请输入车牌号"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  label="卡口">
                  <a-input v-model="queryParam.bayonet" placeholder="请输入卡口"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  label="车辆进入时间">
                  <a-date-picker
                    v-decorator="[
                      'getIntoTime'
                    ]"
                    @change="changeDates"
                    placeholder="请选择车辆进入时间"
                    style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  label="车辆出去时间">
                  <a-date-picker
                    style="width: 100%"
                    v-decorator="[
                      'getOutTime'
                    ]"
                    @change="changeDate"
                    placeholder="请选择车辆出去时间"
                  />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="_getList" v-if="$permissionHandle('vehicleInfo:_getList')">查询</a-button>
                <a-button style="margin-left: 8px" @click="refresh" v-if="$permissionHandle('vehicleInfo:refresh')">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-list
        :grid="{ gutter: 16, column: 3 }"
        :pagination="pagination"
        class="m_list"
        :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <template v-if="item.isKeyMonitoring === '1'">
            <a-card
              hoverable
              class="red status">
              <template v-if="item.fileId !== ''">
                <img alt="example" v-lazy="upload_url + item.fileId" slot="cover" @click="showModal(item.fileId)"/>
              </template>
              <template v-else>
                <img alt="example" :src="noPic" slot="cover"/>
              </template>
              <template class="ant-card-actions" slot="actions" >
                <a>
                  <a-popover>
                    <template slot="content" >
                      <p>卡口：{{ item.bayonet }}</p>
                      <p>车辆颜色：{{ item.carColour }}</p>
                      <p>车牌颜色：{{ item.licencePlateColour }}</p>
                      <template v-if="item.isKeyMonitoring === '0'">
                        <p>重点监控车辆: 否</p>
                      </template>
                      <template v-if="item.isKeyMonitoring === '1'">
                        <p>重点监控车辆: 是</p>
                      </template>
                    </template>
                    <a href="javascript:;"><a-icon type="bars" style="color:#001529"/></a>
                  </a-popover>
                </a>
              </template>
              <p>小区名称：{{ item.residenceId }}</p>
              <p>设备：{{ item.equipmentId }}</p>
              <p>车牌号：{{ item.carNum }}</p>
              <p>出行时间：{{ item.getOutTime }}</p>
              <p>返回时间：{{ item.getIntoTime }}</p>
            </a-card>
          </template>
          <template v-else>
            <a-card
              class="red"
              hoverable>
              <img alt="example" :src="upload_url + item.fileId" slot="cover" @click="showModal(item.fileId)"/>
              <template class="ant-card-actions" slot="actions" >
                <a>
                  <a-popover>
                    <template slot="content" >
                      <p>卡口：{{ item.bayonet }}</p>
                      <p>车辆颜色：{{ item.carColour }}</p>
                      <p>车牌颜色：{{ item.licencePlateColour }}</p>
                      <template v-if="item.isKeyMonitoring === '0'">
                        <p>重点监控车辆: 否</p>
                      </template>
                      <template v-if="item.isKeyMonitoring === '1'">
                        <p>重点监控车辆: 是</p>
                      </template>
                    </template>
                    <a href="">详细</a>
                  </a-popover>
                </a>
              </template>
              <p>小区名称：{{ item.residenceId }}</p>
              <p>设备：{{ item.equipmentId }}</p>
              <p>车牌号：{{ item.carNum }}</p>
              <p>出行时间：{{ item.getOutTime }}</p>
              <p>返回时间：{{ item.getIntoTime }}</p>
            </a-card>
          </template>
          <a-modal
            :visible="visible"
            :footer="null"
            @cancel="handleCancel">
            <p style="margin-top:20px;"><img alt="example" :src="imgModel" style="display:block;width:100%;" slot="cover"/></p>
          </a-modal>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>
<script>
import { getList } from '@/api/vehicle/info/index'
import { findTree, findAllresidenceId } from '@/api/vehicle/vehicleLibrary/index'
export default {
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      visible: false,
      imgModel: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      loading: false,
      pagination: {
        onChange: (page) => {
          console.log(this.pagination)

          this.pagination.current = page
          this.pagination.page = page
          this.queryParam.pageNo = page - 1
          this._getList()
        }
      },
      option: [],
      upload_url: this.$UPLOAD_URL.UPLOAD_URL + 'image/',
      queryParam: {
        residenceId: '',
        equipmentId: '',
        carNum: '',
        bayonet: '',
        getIntoTime: '',
        getOutTime: '',
        pageSize: 12,
        pageNo: 0
      },
      allAllPlot: [],
      form: this.$form.createForm(this),
      data: []
    }
  },
  created () {
    this._getList()
    this._getAllPlot()
  },
  methods: {
    // 根据小区选择设备
    handleChange (value) {
      // console.log(`selected ${value}`)
      this._findAllresidenceId(value)
    },
    _findAllresidenceId (id) {
      return new Promise((resolve, reject) => {
        findAllresidenceId({ residenceId: id }).then(res => {
          this.allAllPlot = res.data
        })
      })
    },
    // 获取所有小区
    _getAllPlot () {
      return new Promise((resolve, reject) => {
        findTree().then(res => {
          this.option = res.data
        })
      })
    },
    showModal (id) {
      this.imgModel = this.upload_url + id
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    changeDate (data, dateString) {
      this.queryParam.getOutTime = dateString
    },
    changeDates (data, dateString) {
      this.queryParam.getIntoTime = dateString
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    refresh () {
      this.queryParam.residenceId = ''
      this.queryParam.equipmentId = ''
      this.queryParam.carNum = ''
      this.queryParam.bayonet = ''
      this.queryParam.getIntoTime = ''
      this.queryParam.getOutTime = ''
      this.queryParam.pageNo = 0
      this.form.resetFields()
      const pagination = { ...this.pagination }
      pagination.current = 1
      this._getList()
    },
    _getList () {
      this.loading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        this.queryParam.residenceId = values.residenceId
        this.queryParam.equipmentId = values.equipmentId
        getList(this.queryParam).then(res => {
          this.data = res.data.content
          const pagination = { ...this.pagination }
          pagination.pageSize = this.queryParam.pageSize
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
<style>
.status{border:1px dashed red;}
  .red .ant-card-body{padding:5px;}
  .red p{margin-bottom: 5px;}
  .ant-modal-mask{background-color:rgba(0, 0, 0, 0.15) !important;}
</style>
