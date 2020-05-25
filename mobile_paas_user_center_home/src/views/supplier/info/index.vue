<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="供应商名称">
                <a-input v-model="queryParam.name" placeholder="请输入供应商名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="供应商类型">
                <a-select
                  style="width: 100%"
                  v-decorator="['type']"
                  placeholder="请选择供应商类型">
                  <a-select-option value="1">货物类</a-select-option>
                  <a-select-option value="2">工程类</a-select-option>
                  <a-select-option value="3">服务类</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="联系人">
                <a-input v-model="queryParam.linkMan" placeholder="请输入联系人"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="经营范围">
                <a-input v-model="queryParam.range" placeholder="请输入经营范围"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('supplier:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('supplier:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('supplier:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('supplier:deleteMult')">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :loading="loading"
        :scroll="{x:1500}"
        @change="handleTableChange"
        :pagination="pagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data">
        <span slot="type" slot-scope="text, record">
          <template v-if="record.type === '1'">货物类</template>
          <template v-if="record.type === '2'">工程类</template>
          <template v-if="record.type === '3'">服务类</template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)" v-if="$permissionHandle('supplier:handleDetail')" >详细</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-if="$permissionHandle('supplier:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('supplier:confirm')">删除</a>
          </template>
        </span>
      </a-table>
      <edit ref="editModal" :rowss="rows" @getList="_getList"/>
      <detail ref="detailModal" :rowss="rows" @getList="_getList"/>
    </a-card>
  </div>
</template>
<script>
import edit from './modules/edit'
import detail from './modules/details'
import { getList, deleteList } from '@/api/supplier/info/index'
import mixins from '@/mixin/index'
const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: '名称',
  scopedSlots: { customRender: 'name' }
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
  scopedSlots: { customRender: 'type' }
}, {
  dataIndex: 'linkMan',
  key: 'linkMan',
  title: '联系人',
  scopedSlots: { customRender: 'linkMan' }
}, {
  title: '联系电话',
  dataIndex: 'linkTel',
  key: 'linkTel'
}, {
  dataIndex: 'range',
  key: 'range',
  title: '经营范围'
}, {
  title: '入围时间',
  dataIndex: 'idate',
  key: 'idate'
}, {
  title: '资质情况',
  key: 'aptitude',
  dataIndex: 'aptitude'
}, {
  title: '操作',
  key: 'action',
  fixed: 'right',
  width: 150,
  scopedSlots: { customRender: 'action' }
}]

export default {
  components: {
    edit,
    detail
  },
  data () {
    return {
      popover: false,
      rows: '',
      loading: false,
      request: getList,
      deleteLists: deleteList,
      deleteList: [],
      pagination: {
        // showSizeChanger: true
      },
      queryParam: {
        name: '',
        type: '',
        linkMan: '',
        range: '',
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
  methods: {
    getList () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam.type = values.type
          this._getList()
        }
      })
    },
    refresh () {
      this.queryParam.name = ''
      this.queryParam.type = ''
      this.queryParam.range = ''
      this.queryParam.linkMan = ''
      this.form.resetFields()
      this.refreshs()
    }
  },
  mixins: [mixins.list]
}
</script>
