<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.name" placeholder="请输入名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="类型">
                <a-select
                  style="width: 100%"
                  v-decorator="['type']"
                  placeholder="请选择类型">
                  <a-select-option value="1">招标代理机构</a-select-option>
                  <a-select-option value="2">造价审核机构</a-select-option>
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
                <a-button type="primary" @click="getList" v-if="$permissionHandle('organization:getList')">查询</a-button>
                <a-button type="primary" @click="handleAdd" v-if="$permissionHandle('organization:handleAdd')">新增</a-button>
                <a-button @click="refresh" v-if="$permissionHandle('organization:refresh')">重置</a-button>
                <a-button type="danger" @click="deleteMult" v-if="$permissionHandle('organization:deleteMult')">删除</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :loading="loading"
        @change="handleTableChange"
        :pagination="pagination"
        :scroll="{x:1500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data">
        <span slot="type" slot-scope="text, record">
          <template v-if="record.type === '1'">招标代理机构</template>
          <template v-if="record.type === '2'">造价审核机构</template>
        </span>
        <span slot="state" slot-scope="text, record">
          <template v-if="record.state === '1'">
            <a-switch defaultChecked @change="onChangeState" checkedChildren="在岗" unCheckedChildren="离岗" @click="onClickState(record)"/>
          </template>
          <template v-if="record.state === '2'">
            <a-switch @change="onChangeState" checkedChildren="在岗" unCheckedChildren="离岗" @click="onClickState(record)"/>
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)" v-if="$permissionHandle('organization:handleDetail')">详细</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)" v-if="$permissionHandle('organization:handleEdit')">修改</a>
            <a-divider type="vertical" />
            <a @click="confirm(record.id)" v-if="$permissionHandle('organization:confirm')">删除</a>
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
import { getList, deleteList, changeState } from '@/api/organ/info/index'
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
  title: '资质情况',
  key: 'aptitude',
  dataIndex: 'aptitude'
}, {
  title: '机构状态',
  dataIndex: 'state',
  key: 'state',
  scopedSlots: { customRender: 'state' }
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
      request: getList,
      deleteLists: deleteList,
      loading: false,
      deleteList: [],
      pagination: {},
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
      queryParamName: '',
      ids: ''
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
      // this._getList()
    },
    onClickState (row) {
      this.ids = row.id
    },
    onChangeState (checked) {
      this.$nextTick(() => {
        if (checked) {
          this._chageState(this.ids, 1)
        } else {
          this._chageState(this.ids, 2)
        }
      })
      this._getList()
    },
    _chageState (id, state) {
      return new Promise((resolve, reject) => {
        changeState({ id: id, state: state }).then(res => {

        })
      })
    }

  },
  mixins: [mixins.list]
}
</script>
