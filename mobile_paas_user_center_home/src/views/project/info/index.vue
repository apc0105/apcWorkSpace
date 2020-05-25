<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.proName" placeholder="请输入项目名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="承办部门"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }">
                <a-tree-select
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="treeData"
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
                <a-button type="primary" @click="getList" v-if="$permissionHandle('projectinfo:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('projectinfo:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('projectinfo:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('projectinfo:deleteMult')">删除</a-button>
                <a-button type="dashed" @click="approval" v-if="$permissionHandle('projectinfo:approval')">项目立项</a-button>
                <a-button type="dashed" @click="argument" v-if="$permissionHandle('projectinfo:argument')">项目论证</a-button>
                <a-button type="dashed" @click="budget" v-if="$permissionHandle('projectinfo:budget')">项目预算</a-button>
                <a-button type="dashed" @click="handleExamine" v-if="$permissionHandle('projectinfo:handleExamine')">项目审批</a-button>
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
    <edit ref="editModal" :rowss="rows" @getList="_getList" :treeData="treeData"/>
    <management ref="managementModal" :rowss="managementrows" @getList="_getList" @noSelectChange="noSelectChange" :treeData="treeData"/>
    <detail ref="detailModal" :ids="ids" @getList="_getList" :treeData="treeData" @noSelectChange="noSelectChange"/>
    <approval ref="approvalModal" :ids="ids" @getList="_getList" @noSelectChange="noSelectChange"/>
    <argument ref="argumentModal" :ids="ids" @getList="_getList" @noSelectChange="noSelectChange" :treeData="treeData"/>
    <budget ref="budgetModal" :ids="ids" @getList="_getList" @noSelectChange="noSelectChange"/>
  </div>
</template>
<script>
import tables from './modules/table'
import edit from './modules/edit'
import detail from './modules/examine'
import argument from './modules/argument'
import budget from './modules/budget'
import approval from './modules/approval'
import management from './modules/management'
import { transform } from '@/utils/trans'
import { getList, deleteList } from '@/api/project/info/index'
import { findTree } from '@/api/system/dep/index'
import mixins from '@/mixin/index'
export default {
  components: {
    tables,
    edit,
    management,
    detail,
    approval,
    argument,
    budget
  },
  data () {
    return {
      optionss: [],
      request: getList,
      deleteLists: deleteList,
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
      managementrows: {},
      popover: false,
      loading: false,
      deleteList: [],
      ids: '',
      pagination: {},
      queryParam: {
        proName: '',
        depId: '',
        proType: '1',
        proState: '',
        pageSize: 10,
        pageNo: 0
      },
      form: this.$form.createForm(this),
      treeData: [],
      findTree: findTree,
      transform: transform,
      data: [],
      selectedRowKeys: [],
      selectedRowKeyss: [],
      queryParamName: ''
    }
  },
  created () {
    this._findTree()
    this.optionss = { ...this.option }
  },
  methods: {
    // 预算
    budget () {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.$refs.budgetModal.open()
        this.ids = this.deleteList[0]
      }
    },
    // 立项
    approval () {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.$refs.approvalModal.open()
        this.ids = this.deleteList[0]
      }
    },
    // 论证
    argument () {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.$refs.argumentModal.open()
        this.ids = this.deleteList[0]
      }
    },
    handleExamine () {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.$refs.detailModal.details()
        this.ids = this.deleteList[0]
      }
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
    handleproject (obj, name) {
      if (this.deleteList.length === 1) {
        this.managementrows = { type: obj, id: this.deleteList[0], name: name }
        this.$refs.managementModal.update()
        this._getList()
      } else if (this.deleteList.length === 0) {
        this.$message.warning('请选择项目')
      } else {
        this.$message.warning('只能选择一条项目')
      }
    },
    refresh () {
      this.queryParam.proName = ''
      this.queryParam.depId = ''
      this.queryParam.proState = ''
      this.queryParam.pageNo = 0
      this.form.resetFields()
      this.refreshs()
    }
  },
  mixins: [mixins.list]
}
</script>
