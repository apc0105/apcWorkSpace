<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="参数类型名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入参数类型名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入参数类型名称"
          />
        </a-form-item>
        <a-form-item
          label="参数类型编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'code',
              {rules: [
                { required: true, message: '请输入参数类型编码' },
              ]}
            ]"
            placeholder="请输入参数类型编码"
          />
        </a-form-item>
        <a-form-item
          label="参数类型描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-textarea
            v-decorator="[
              'descr',
            ]"
            placeholder="请输入参数类型描述"
            :autosize="{ minRows: 2, maxRows: 6 }" />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify } from '@/api/system/param/index'

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
        this.form.setFieldsValue({
          parIds: '',
          parId: ''
        })
        this.params = {}
      }
    }
  },
  data () {
    return {
      maskClosable: false,
      treeData: [],
      title: '',
      parTree: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      popover: false,
      tree: [],
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 点击树节点触发
    onSelect (keys, node) {
      this.form.setFieldsValue({
        parIds: node.node.title,
        parId: keys[0]
      })
      this.popover = false
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
      this.title = '参数类型管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '参数类型管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.form.setFieldsValue({
            name: res.data.name,
            descr: res.data.descr,
            code: res.data.code
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
            this.params.code = values.code
            this.params.descr = values.descr
            this.params.id = this.$refs.hiddenInput.value
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
