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
                label="卡口">
                <a-input v-model="queryParam.bayonet" placeholder="请输入卡口"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
                label="告警时间">
                <a-date-picker
                  @change="changeDate"
                  v-decorator="[
                    'createTime'
                  ]"
                  placeholder="请选择告警时间"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16, offset: 2 }">
                <a-button type="primary" @click="_getList" v-if="$permissionHandle('vehiclePolice:_getList')">查询</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('vehiclePolice:refresh')">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :columns="columns"
        :dataSource="data">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)">删除</a>
          </template>
        </span>
      </a-table> -->
      <a-list
        :grid="{ gutter: 16, column: 3 }"
        :pagination="pagination"
        class="m_list"
        :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card
            hoverable
            class="red">
            <template v-if="item.fileId !== ''">
              <img alt="example" v-lazy="upload_url + item.fileId" slot="cover" @click="showModal(item.fileId)"/>
            </template>
            <template v-else>
              <img alt="example" :src="noPic" slot="cover"/>
            </template>
            <p>小区名称：{{ item.residenceId }}</p>
            <p>车牌号：{{ item.carNum }}</p>
            <p>卡口:{{ item.bayonet }}</p>
            <p>告警时间：{{ item.createTime }}</p>
          </a-card>
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
import { getList } from '@/api/vehicle/police/index'

export default {
  data () {
    return {
      loading: false,
      imgModel: '',
      upload_url: this.$UPLOAD_URL.UPLOAD_URL + 'image/',
      pagination: {
        onChange: (page) => {
          console.log(this.pagination)
          this.pagination.current = page
          this.pagination.page = page
          this.queryParam.pageNo = page - 1
          this._getList()
        }
      },
      visible: false,
      queryParam: {
        bayonet: '',
        carNum: '',
        createTime: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      data: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    showModal (id) {
      this.imgModel = this.upload_url + id
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    changeDate (data, dateString) {
      this.queryParam.createTime = dateString
    },
    refresh () {
      this.queryParam.carNum = ''
      this.queryParam.bayonet = ''
      this.queryParam.createTime = ''
      this.queryParam.pageNo = 0
      this.form.resetFields()
      const pagination = { ...this.pagination }
      pagination.current = 1
      this._getList()
    },
    _getList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        getList(this.queryParam).then(res => {
          this.data = res.data.content
          const pagination = { ...this.pagination }
          pagination.total = res.data.totalElements
          pagination.pageSize = this.queryParam.pageSize
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
    .red .ant-card-body{padding:5px;}
  .red p{margin-bottom: 5px;}
  .ant-modal-mask{background-color:rgba(0, 0, 0, 0.15) !important;}
</style>
