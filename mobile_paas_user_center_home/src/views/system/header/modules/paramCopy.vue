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
        <!-- <a-form-item
          label="物理表名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'tableName'
            ]"
            placeholder="请输入物理表名称"
          />
        </a-form-item> -->
        <a-form-item
          label="复制年份"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'year',
              {rules: [
                { required: true, message: '请输入复制年份' },
                { validator: validYear}
              ]}
            ]"
            placeholder="请输入复制年份"
          />
        </a-form-item>
        <a-form-item
          label="目标年份"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'copyYear',
              {rules: [
                { required: true, message: '请输入目标年份' },
                { validator: validYear}
              ]}
            ]"
            placeholder="请输入目标年份"
          />
        </a-form-item>
        <a-form-item
          label="项目类型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }">
          <a-select
            placeholder="请选择项目类型"
            v-decorator="[
              'proType',
              {rules: [
                { required: true, message: '请选择项目类型' },
              ]}
            ]"
          >
            <a-select-option v-for="item in option" :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { findYear } from '@/api/system/header/index'

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
      option: [
        { id: '1', name: '集中采购项目' },
        { id: '2', name: '自行采购项目' }
      ],
      visible: false,
      popover: false,
      tree: [],
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 验证年份
    validYear (rule, value, callback) {
      var reg = /^\d{4}$/
      // console.log(reg.test(value))
      if (!reg.test(value) && value !== undefined) {
        callback(new Error('请输入正确的年份,如"2018"'))
      } else {
        callback()
      }
    },
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
      this.title = '表头复制'
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            // this.params.tableName = values.tableName
            this.params.year = values.year
            this.params.proType = values.proType
            this.params.copyYear = values.copyYear
            findYear(this.params).then(res => {
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
