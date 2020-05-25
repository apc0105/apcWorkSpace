<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="项目名称"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-model="proName"
              disabled
              placeholder="请输入项目名称"
            />
          </a-form-item>
          <a-form-item
            label="总预算（万元）"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
              <span slot="title" v-if="value" class="numeric-input-title">
                {{ value !== '-' ? formatNumber(value) : '-' }}
              </span>
              <template slot="title" v-else>请输入预算金额</template>
              <a-input
                :value="value"
                @change="onChanges"
                @blur="onBlur"
                placeholder="请输入总预算"
                v-decorator="[
                  'totalFound'
                ]"
                :maxLength="25"
              />
            </a-tooltip>
          </a-form-item>
          <a-form-item
            label="财政资金（万元）"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
              <span slot="title" v-if="value" class="numeric-input-title">
                {{ value !== '-' ? formatNumber(value) : '-' }}
              </span>
              <template slot="title" v-else>请输入财政资金</template>
              <a-input
                :value="value"
                @change="onChanges"
                @blur="onBlur"
                placeholder="请输入财政资金"
                v-decorator="[
                  'financialFound',
                ]"
                :maxLength="25"
              />
            </a-tooltip>
          </a-form-item>
        </a-form>
        <a-row type="flex" justify="end" style="margin-bottom:10px;">
          <a-col :span="4"><a-button @click="add">添加</a-button></a-col>
        </a-row>
        <a-table :columns="columns" :dataSource="data" bordered >
          <span slot="action" slot-scope="text, record">
            <a @click="handleUpdate(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="handleDelete(record)">删除</a>
          </span>
        </a-table>
      </a-spin>
    </a-modal>
    <budget-module
      ref="budget"
      :subpackage="id"
      :ids="ids"
      @_modify="_modify"
      :type="type"
      :listId="listId"/>
  </div>
</template>
<script>
import budgetModule from './budgetModule'
import { modify, saveList, deletePackage } from '@/api/project/info/index'
function formatNumber (value) {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}
export default {
  components: {
    budgetModule
  },
  props: {
    ids: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      maskClosable: false,
      listId: '',
      confirmLoading: false,
      title: '',
      id: '',
      visible: false,
      form: this.$form.createForm(this),
      data: [],
      type: '',
      proName: '',
      value: '',
      params: {},
      subpackage: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'number'
        }, {
          title: '分包名称',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        }, {
          title: '预算金额（万元）',
          dataIndex: 'budgetAmount',
          key: 'budgetAmount',
          scopedSlots: { customRender: 'budgetAmount' }
        }, {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    formatNumber,
    add () {
      this.$refs.budget.open()
      this.subpackage = this.id
      this.type = this.params.proType
    },
    //  修改
    handleUpdate (row) {
      this.$refs.budget.update()
      this.listId = row.id
    },
    handleDelete (row) {
      return new Promise((resolve, reject) => {
        const that = this
        this.$confirm({
          title: '此操作将永久删除该数据, 是否继续?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            deletePackage({ id: row.id }).then(res => {
              if (res.retCode === 200) {
                that._modify(that.ids)
                that.$message.success(res.message)
              } else {
                that.$message.error(res.message)
              }
            })
          }
        })
      })
    },
    onChanges (e) {
      const { value } = e.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value
      }
    },
    onBlur () {
      const { value, onChange } = this
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        onChange({ value: value.slice(0, -1) })
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.params.totalFound = values.totalFound
            this.params.financialFound = values.financialFound
            saveList(this.params).then(res => {
              setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              }, 200)
              if (res.retCode === 200) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              this.$emit('getList')
            })
          })
        }
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.id = res.data.id
          this.proName = res.data.proName
          if (res.data.financialFound !== undefined || res.data.totalFound !== undefined) {
            this.form.setFieldsValue({
              financialFound: res.data.financialFound,
              totalFound: res.data.totalFound
            })
          }
          if (res.param.proPackage !== 'a') {
            this.data = res.param.proPackage
            this.data.forEach((res, index) => {
              res.number = index + 1
            })
          } else {
            this.data = []
          }
        })
      })
    },
    open () {
      this.title = '项目预算'
      this.visible = true
      this.$nextTick(() => {
        this._modify(this.ids)
      })
    },
    handleCancel () {
      this.visible = false
      this.form.setFieldsValue({
        financialFound: '',
        totalFound: ''
      })
    }
  }
}
</script>
