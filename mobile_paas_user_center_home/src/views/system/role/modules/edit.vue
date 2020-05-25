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
          label="角色名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }">
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入角色名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入角色名称"
          />
        </a-form-item>
        <a-form-item
          label="角色描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-textarea
            placeholder="请输入角色描述"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-decorator="[
              'descr',
            ]"/>
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify } from '@/api/system/role/index'

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
          areaId: ''
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
  created () {
  },
  methods: {
    // 验证不能输入特殊字符
    alidateRequire (rule, value, callback) {
      if (!isvalidRequire(value) && value !== undefined) {
        callback(new Error('数据不能包含特殊字符'))
      } else {
        callback()
      }
    },
    // 点击树节点触发
    onSelect (keys, node) {
      this.form.setFieldsValue({
        parIds: node.node.title,
        areaId: keys[0]
      })
      this.popover = false
    },
    add () {
      this.visible = true
      this.title = '角色管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '角色管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.form.setFieldsValue({
            name: res.data.name,
            descr: res.data.descr
          })
          this.tree.forEach(val => {
            if (val.key === res.data.areaId) {
              this.form.setFieldsValue({
                parIds: val.title,
                areaId: val.key
              })
            } else {
              if (val.name === undefined && val.name === '') {
                this.form.setFieldsValue({
                  parIds: '-1'
                })
              }
            }
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
            this.params.descr = values.descr
            this.params.id = this.$refs.hiddenInput.value
            saveList(this.params).then(res => {
              setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              }, 200)
              this.$message.success(res.message)
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
