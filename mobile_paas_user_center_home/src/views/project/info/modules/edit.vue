<template>
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
            v-decorator="[
              'proName',
              {rules: [
                { required: true, message: '请输入项目名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入项目名称"
          />
        </a-form-item>
        <a-form-item
          label="项目类型"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-select
            style="width: 100%"
            v-decorator="[
              'proType',
              {rules: [
                { required: true, message: '请选择项目类型' },
              ]}
            ]"
            placeholder="请选择项目类型">
            <a-select-option value="1">集中采购项目</a-select-option>
            <a-select-option value="2">自行采购项目</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item
          label="会议日期"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'meetingDate',
              {rules: [
                { required: true, message: '请输入会议日期' },
              ]}
            ]"
            placeholder="请输入会议日期"
          />
        </a-form-item> -->
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
              'depId',
              {
                rules:[
                  { required: true, message: '请选择承办部门' },
                ]
              }
            ]">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="项目概述"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-textarea
            :rows="4"
            v-decorator="[
              'proContent',
              {rules: [
                { required: false, message: '请输入项目概述' },
              ]}
            ]"
            placeholder="请输入项目概述"
          />
        </a-form-item>
        <!-- <a-form-item
          label="立项方式"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'apprWay',
              {rules: [
                { required: true, message: '请输入立项方式' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入立项方式"
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
                'totalFound',
                {rules: [
                  { required: true, message: '请输入总预算' },
                ]}
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
                {rules: [
                  { required: true, message: '请输入财政资金' },
                ]}
              ]"
              :maxLength="25"
            />
          </a-tooltip>
        </a-form-item> -->
        <a-form-item
          label="备注"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-textarea
            :rows="4"
            v-decorator="[
              'remark'
            ]"
            placeholder="请输入备注"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import moment from 'moment'
import mixins from '@/mixin/index'
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { saveList, modify } from '@/api/project/info/index'
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
  props: {
    rowss: {
      type: String,
      default: ''
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
        this.params = {}
      }
    }
  },
  data () {
    return {
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      title: '',
      parTree: '',
      visible: false,
      popover: false,
      params: {},
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    formatNumber,
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
    moment,
    onChange (data, dateString) {
      this.round = dateString
    },
    // 验证不能输入特殊字符
    alidateRequire (rule, value, callback) {
      if (!isvalidRequire(value) && value !== undefined) {
        callback(new Error('数据不能包含特殊字符'))
      } else {
        callback()
      }
    },
    validPhone (rule, value, callback) {
      if (!isvalidPhone(value)) {
        callback(new Error('数据长度为11位'))
      } else {
        callback()
      }
    },
    add () {
      this.visible = true
      this.title = '项目立项新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目立项修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          if (res.data.fileKey) {
            this.fileList = JSON.parse(res.data.fileKey)
          } else {
            this.fileList = []
          }
          this.form.setFieldsValue({
            proName: res.data.proName,
            proType: res.data.proType,
            proContent: res.data.proContent,
            apprWay: res.data.apprWay,
            meetingDate: res.data.meetingDate,
            totalFound: res.data.totalFound,
            financialFound: res.data.financialFound,
            remark: res.data.remark,
            depId: res.data.depId
          })
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.params.proName = values.proName
            this.params.proType = values.proType
            this.params.meetingDate = values.meetingDate
            this.params.proContent = values.proContent
            this.params.apprWay = values.apprWay
            // this.params.totalFound = values.totalFound
            // this.params.financialFound = values.financialFound
            this.params.remark = values.remark
            this.params.depId = values.depId
            // this.params.fileKey = JSON.stringify(this.fileList)
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
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  },
  mixins: [mixins.upload]
}
</script>
