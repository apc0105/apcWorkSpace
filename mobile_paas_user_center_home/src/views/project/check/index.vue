<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.name" placeholder="请输入项目名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="承办部门"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }">
                <a-tree-select
                  style="width: 100%"
                  :treeData="treeData"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  placeholder="请选择承办部门"
                  v-decorator="[
                    'depId'
                  ]">
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="项目状态">
                <a-select
                  placeholder="请选择项目状态"
                  v-decorator="[
                    'proState'
                  ]">
                  <a-select-option v-for="d in optionss" :key="d.value">{{ d.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item label="招标日期">
                <a-range-picker @change="onChangeDate"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('projectcheck:getList')">查询</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('projectcheck:refresh')">重置</a-button>
                <a-button type="dashed" @click="bids" v-if="$permissionHandle('projectcheck:bids')">项目验收</a-button>
                <!-- <a-button type="dashed" @click="refresh">项目采购</a-button> -->
                <!-- <a-button type="dashed" @click="pact">项目合同</a-button> -->
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="集中采购项目" key="1">
          <tables
            :loading="loading"
            @handleTableChange="handleTableChange"
            :selectedRowKeys="selectedRowKeys"
            @onSelectChange="onSelectChange"
            :pagination="pagination"
            @confirm="confirm"
            @_getList="_getList"
            :treeData="treeData"
            :data="data">
          </tables>
        </a-tab-pane>
        <a-tab-pane tab="自行采购项目" key="2" forceRender>
          <tables
            :loading="loading"
            @handleTableChange="handleTableChange"
            :selectedRowKeys="selectedRowKeyss"
            @onSelectChange="onSelectChanges"
            @confirm="confirm"
            :pagination="pagination"
            @_getList="_getList"
            :treeData="treeData"
            :data="data">
          </tables>
        </a-tab-pane>
        <!-- <a-tab-pane tab="其他" key="3" forceRender>Content of Tab Pane 3</a-tab-pane> -->
      </a-tabs>
    </a-card>
    <bidsModule ref="bidsModal" :ids="ids" @getList="_getList" @noSelectChange="noSelectChange" :proName="proName"/>
  </div>
</template>
<script>
import tables from './modules/table'
import bidsModule from './modules/bidsModule'
import { transform } from '@/utils/trans'
import { getList, deleteList } from '@/api/project/info/index'
import { findTree } from '@/api/system/dep/index'
import mixins from '@/mixin/index'
export default {
  components: {
    tables,
    // bids,
    bidsModule
    // pactModule
  },
  data () {
    return {
      findTree: findTree,
      transform: transform,
      proName: '',
      optionss: [],
      option: [ // 集中项目
        { value: '1', text: '立项' },
        { value: '2', text: '招标' },
        { value: '3', text: '验收' },
        { value: '4', text: '付款' }
      ],
      options: [ // 完成自采项目
        { value: '1', text: '立项' },
        { value: '2', text: '招标' },
        { value: '3', text: '付款' },
        { value: '4', text: '完成' }
      ],
      rows: '',
      ids: '',
      popover: false,
      loading: false,
      deleteList: [],
      pagination: {},
      request: getList,
      deleteLists: deleteList,
      queryParam: {
        name: '',
        depId: '',
        apprWay: '',
        apprDate: '',
        proType: '1',
        proState: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      treeData: [],
      data: [],
      selectedRowKeyss: [],
      selectedRowKeys: [],
      queryParamName: ''
    }
  },
  created () {
    this._findTree()
    this.optionss = { ...this.option }
  },
  methods: {
    // 项目招标
    bids () {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.$refs.bidsModal.update()
        this._getList()
        this.ids = this.deleteList[0].id
        this.proName = this.deleteList[0].name
      }
    },
    onChange (date, dateString) {
      this.queryParam.apprDate = dateString
    },
    getList () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam.depId = values.depId
          this.queryParam.proState = values.proState
          this._getList()
        }
      })
    },
    refresh () {
      this.queryParam.name = ''
      this.queryParam.depId = ''
      this.queryParam.proState = ''
      this.queryParam.pageNo = 0
      this.form.resetFields()
      this.refreshs()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.deleteList = []
      selectedRows.forEach(val => {
        this.deleteList.push({ id: val.id, name: val.proName })
      })
    },
    onSelectChanges (selectedRowKeys, selectedRows) {
      this.selectedRowKeyss = selectedRowKeys
      this.deleteList = []
      selectedRows.forEach(val => {
        this.deleteList.push({ id: val.id, name: val.proName })
      })
    },
    // 删除多个
    confirm (data) {
      if (data.length !== undefined) {
        this.deleteList = []
        this.deleteList.push(data[0])
        this.deleteMult()
      } else {
        this.deleteMult()
      }
    }
  },
  mixins: [mixins.list]
}
</script>
