<template>
  <a-modal
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
          label="名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="类型"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-select
            style="width: 100%"
            v-decorator="[
              'type',
              {rules: [
                { required: true, message: '请选择类型' },
              ]}
            ]"
            placeholder="请选择类型">
            <a-select-option value="1">招标代理机构</a-select-option>
            <a-select-option value="2">造价审核机构</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="联系人"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'linkMan'
            ]"
            placeholder="请输入联系人"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'linkTel'
            ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item
          label="资质情况"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'aptitude'
            ]"
            placeholder="请输入资质情况"
          />
        </a-form-item>
        <a-form-item
          label="机构状态"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-radio-group
            v-model="state">
            <a-radio :value="1">有效</a-radio>
            <a-radio :value="0">无效</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import moment from 'moment'
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify } from '@/api/organ/info/index'

export default {
  props: {
    rowss: {
      type: String,
      default: ''
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
      state: 1,
      radioStyle: {
        display: 'inline-block',
        height: '30px',
        lineHeight: '30px'
      },
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      treeData: [],
      title: '',
      parTree: '',
      visible: false,
      popover: false,
      tree: [],
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
  },
  methods: {
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
    add () {
      this.visible = true
      this.title = '机构管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '机构管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.form.setFieldsValue({
            name: res.data.name,
            type: res.data.type,
            range: res.data.range,
            idate: res.data.idate,
            linkMan: res.data.linkMan,
            linkTel: res.data.linkTel,
            aptitude: res.data.aptitude
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
            this.params.name = values.name
            this.params.type = values.type
            this.params.linkMan = values.linkMan
            this.params.linkTel = values.linkTel
            this.params.aptitude = values.aptitude
            this.params.state = this.state
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
  }
}
</script>
