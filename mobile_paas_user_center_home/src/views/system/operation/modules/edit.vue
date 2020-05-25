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
          label="所属资源"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
          <a-popover
            placement="bottom"
            trigger="click"
            v-model="popover"
          >
            <a slot="content">
              <a-tree
                :treeData="treeData"
                @select="onSelect"
                :defaultSelectedKeys="defaultSelectedKeys"
              >
              </a-tree>
            </a>
            <a-input
              v-decorator="[
                'parIds',
              ]"
              readonly
              placeholder="请选择区域名称"
            />
            <a-input
              v-decorator="['resId']"
              type="hidden"
              placeholder="请选择区域名称"
            />
          </a-popover>
        </a-form-item>
        <a-form-item
          label="操作名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入操作名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入操作名称"
          />
        </a-form-item>
        <a-form-item
          label="操作编码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'code',
              {rules: [
                { required: true, message: '请输入操作编码' },
              ]}
            ]"
            placeholder="请输入操作编码"
          />
        </a-form-item>
        <a-form-item
          label="链接地址"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'url',
              {rules: [
                { required: true, message: '请输入链接地址' },
              ]}
            ]"
            placeholder="请输入链接地址"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify } from '@/api/system/operation/index'
import { findTree } from '@/api/system/resource/index'
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
        this.form.setFieldsValue({
          parIds: '',
          resId: ''
        })
        this.params = {}
      }
    }
  },
  data () {
    return {
      maskClosable: false,
      defaultSelectedKeys: [],
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
    this._findTree()
    console.log(this.defaultSelectedKeys)
  },
  methods: {
    _findTree () {
      return new Promise((resolve, reject) => {
        findTree().then(res => {
          this.$nextTick(() => {
            this.treeData = transform(res.data, 'key', 'parId', 'children')
            this.tree = res.data
          })
        })
      })
    },
    // 点击树节点触发
    onSelect (keys, node) {
      if (keys.length !== 0) {
        this.form.setFieldsValue({
          parIds: node.node.title,
          resId: keys[0]
        })
        this.popover = false
      }
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
      this.title = '操作管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '操作管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.form.setFieldsValue({
            name: res.data.name,
            url: res.data.url,
            code: res.data.code
          })
          this.tree.forEach(val => {
            if (val.key === res.data.resId) {
              this.form.setFieldsValue({
                parIds: val.title,
                resId: val.key
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
          if (values.resId === undefined || values.resId === '') {
            values.resId = '-1'
          }
          return new Promise((resolve, reject) => {
            this.params.name = values.name
            this.params.resId = values.resId
            this.params.code = values.code
            this.params.url = values.url
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
