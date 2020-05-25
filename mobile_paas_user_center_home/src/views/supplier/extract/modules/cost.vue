<template>
  <!-- 造价审核机构 -->
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel">
    <a-form :form="form">
      <!-- <a-form-item label="项目类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-row>
          <a-col :span="16">
            <a-select placeholder="请选择项目类型" @change="handleSearchChange">
              <a-select-option value="1">集中采购项目</a-select-option>
              <a-select-option value="2">自行采购项目</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-form-item> -->
      <a-form-item label="项目名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" >
        <a-row>
          <a-col :span="16">
            <!-- <a-select v-model="project" placeholder="请选择">
              <a-select-option v-for="(item,index) in options" :key="index" :value="item.id">{{ item.proName }}</a-select-option>
            </a-select> -->
            <!-- v-decorator="[
            'aptitude',
            {rules: [
            { required: true, message: '请输入资质情况' },
            { validator: this.alidateRequire},
            ]}
            ]" -->
            <a-input
              v-model="project"
              placeholder="请输入项目名称"
            />
          </a-col>
          <a-col :span="8"><a-button style="margin-left:10px;" @click="extracts">抽取</a-button></a-col>
        </a-row>
      </a-form-item>
    </a-form>
    <a-table
      :loading="loading"
      @change="handleTableChange"
      :pagination="pagination"
      :columns="columns"
      :dataSource="data">
      <span slot="type" slot-scope="text, record">
        <template v-if="record.type === '1'">招标代理机构</template>
        <template v-if="record.type === '2'">造价审核机构</template>
      </span>
      <span slot="state" slot-scope="text, record">
        <template v-if="record.state === '1'"> <a-badge status="success" text="有效" /></template>
        <template v-if="record.state === '0'"><a-badge status="processing" text="无效" /></template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详细</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-if="$permissionHandle('dep:handleEdit')">修改</a>
          <a-divider type="vertical" />
          <a @click="confirm(record.id)" v-if="$permissionHandle('dep:confirm')">删除</a>
        </template>
      </span>
    </a-table>
    <a-row style="margin-top:10px;">
      <!-- <a-col :span="4" style="float:right;">
        <a-button type="primary" @click="againBids">重新抽取</a-button>
      </a-col> -->
      <a-col :span="3" style="float:right;">
        <a-button type="primary" @click="formSubmit">保存</a-button>
      </a-col>
      <a-col :span="3" style="float:right;">
        <a-button @click="handleCancel">取消</a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { getList } from '@/api/project/info/index'
import { extract, deleteList, saveList } from '@/api/supplier/extract/index'
const columns = [
  {
    title: '造价审核机构名称',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  }, {
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '联系电话',
    dataIndex: 'linkTel',
    key: 'linkTel'
  }
]
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      maskClosable: false,
      projectType: '',
      columns,
      project: '',
      title: '',
      loading: false,
      pagination: {},
      visible: false,
      confirmLoading: false,
      selectedRowKeys: [],
      options: [],
      queryParam: {
        proType: '',
        pageSize: 100,
        pageNo: 0
      },
      proName: '',
      data: [],
      form: this.$form.createForm(this)
    }
  },
  watch: {
    visible () {
      if (!this.visible) {
        this.data = []
        this.project = []
      }
    }
  },
  methods: {
    formSubmit () {
      if (this.projectType === '' && this.project === '') {
        this.$message.error('请选择项目类型及项目名称！')
      } else {
        this.submit()
      }
    },
    submit () {
      return new Promise((resolve, reject) => {
        saveList({ proId: this.project, biddingId: this.data[0].id, type: '2' }).then(res => {
          if (res.retCode === 200) {
            this.$message.success(res.message)
            this.visible = false
            this.$emit('_getList')
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    handleSearchChange (value, option) {
      if (value) {
        this.projectType = value
        this._getList()
      }
    },
    extracts () {
      if (this.project === '') {
        this.$message.error('请选择项目再抽取！')
      } else {
        this._extract(this.type, this.project)
      }
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.pageNo = pagination.current
      this.queryParam.pageNo = pager.pageNo - 1
      this.pagination = pager
      this._extract(this.type, this.project)
    },
    handleCancel () {
      this.visible = false
    },
    open () {
      this.title = '造价审核机构抽取'
      this.visible = true
    },
    _getList () {
      return new Promise((resolve, reject) => {
        this.queryParam.proType = this.projectType
        getList(this.queryParam).then(res => {
          this.options = res.data.content
        })
      })
    },
    _extract (id, proId) {
      return new Promise((resolve, reject) => {
        this.data = []
        extract({ type: id, proName: proId }).then(res => {
          if (res.data) {
            this.data.push({ name: res.data.name, linkTel: res.data.linkTel, linkMan: res.data.linkMan, id: res.data.id })
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // 再次抽取
    againBids () {
      this.remove()
      this._extract(this.type, this.project)
    },
    // 删除
    remove () {
      return new Promise((resolve, reject) => {
        console.log(this.data[0].id)
        deleteList({ id: this.data[0].id }).then(res => {

        })
      })
    }
  }
}
</script>
