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
                { required: true, message: '请选择供应商类型' },
              ]}
            ]"
            placeholder="请选择供应商类型">
            <a-select-option value="1">货物类</a-select-option>
            <a-select-option value="2">工程类</a-select-option>
            <a-select-option value="3">服务类</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="经营范围"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-textarea
            :rows="4"
            v-decorator="['range']"
            placeholder="请输入经营范围"
          />
        </a-form-item>
        <a-form-item
          label="入围时间"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-date-picker style="width:100%;" @change="onChange" placeholder="请选择入围时间" :value="moment(round, 'YYYY-MM-DD')"/>
        </a-form-item>
        <a-form-item
          label="联系人"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'linkMan',
              {rules: [
                { required: true, message: '请输入联系人' },
                { validator: this.alidateRequire},
              ]}
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
              'linkTel',
              {rules: [
                { required: true, message: '请输入联系电话' },
                { validator: this.validPhone},
              ]}
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
              'aptitude',
              {rules: [
                { required: true, message: '请输入资质情况' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入资质情况"
          />
        </a-form-item>
        <a-form-item
          label="附件"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange">
            <a-button> <a-icon type="upload" />上传</a-button>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import moment from 'moment'
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { saveList, modify } from '@/api/supplier/info/index'
import mixins from '@/mixin/index'
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
      fileList: [],
      action: this.$UPLOAD_URL.UPLOAD_URL,
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
    validPhone (rule, value, callback) {
      if (!isvalidPhone(value)) {
        callback(new Error('数据长度为11位'))
      } else {
        callback()
      }
    },
    add () {
      this.visible = true
      this.title = '供应商信息管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '供应商信息管理修改'
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
            this.params.range = values.range
            this.params.idate = this.round
            this.params.linkMan = values.linkMan
            this.params.linkTel = values.linkTel
            this.params.aptitude = values.aptitude
            this.params.fileKey = JSON.stringify(this.fileList)
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
