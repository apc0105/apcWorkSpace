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
          label="接口名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入接口名称' }
              ]}
            ]"
            placeholder="请输入接口名称"
          />
        </a-form-item>
        <a-form-item
          label="接口路径"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'inAddress',
              {rules: [
                { required: true, message: '请输入接口路径' }
              ]}
            ]"
            placeholder="请输入接口路径"
          />
        </a-form-item>
        <a-form-item
          label="接口状态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
          <a-radio-group
            v-model="postStatus">
            <a-radio :value="0">未启用</a-radio>
            <a-radio :value="1">启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="请求方式"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'requestMode',
              {rules: [
                { required: true, message: '请输入请求方式' }
              ]}
            ]"
            placeholder="请输入请求方式"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { save, modify, findTree } from '@/api/system/post/index'
import { transform } from '@/utils/trans'

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
      }
    }
  },
  data () {
    return {
      postStatus: 0,
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
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this._findTree()
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
    _findTree () {
      return new Promise((resolve, reject) => {
        findTree().then(res => {
          this.treeData = transform(res.data, 'key', 'parId', 'children')
          this.tree = res.data
        })
      })
    },
    add () {
      this.visible = true
      this.title = '接口管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '接口管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.postStatus = parseInt(res.data.inState)
          this.form.setFieldsValue({
            name: res.data.name,
            inAddress: res.data.inAddress,
            requestMode: res.data.requestMode
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
            this.params.inAddress = values.inAddress
            this.params.inState = this.postStatus
            this.params.requestMode = values.requestMode
            this.params.id = this.$refs.hiddenInput.value
            save(this.params).then(res => {
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
