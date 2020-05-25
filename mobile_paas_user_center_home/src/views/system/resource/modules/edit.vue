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
          label="父资源"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }">
          <a-popover
            placement="bottom"
            trigger="click"
            v-model="popover"
          >
            <a slot="content">
              <a-tree
                :treeData="treeData"
                @select="onSelect"
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
              v-decorator="['parId']"
              type="hidden"
              placeholder="请选择区域名称"
            />
          </a-popover>
        </a-form-item>
        <a-form-item
          label="资源名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入资源名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入资源名称"
          />
        </a-form-item>
        <a-form-item
          label="资源URL"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'url',
              {rules: [
                { required: true, message: '请输入资源URL' },
              ]}
            ]"
            placeholder="请输入资源URL"
          />
        </a-form-item>
        <a-form-item
          label="接口URL"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'interUrl',
              {rules: [
                { required: true, message: '请输入接口URL' },
              ]}
            ]"
            placeholder="请输入接口URL"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify, findTree } from '@/api/system/resource/index'
import { roleList } from '@/api/system/role/index'
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
      roles: [],
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
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      return new Promise((resolve, reject) => {
        roleList().then(res => {
          this.roles = res.data
        })
      })
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
      this.title = '资源管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '资源管理修改'
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
            interUrl: res.data.interUrl,
            roleId: res.data.roleId
          })
          this.tree.forEach(val => {
            if (val.key === res.data.parId) {
              this.form.setFieldsValue({
                parIds: val.title,
                parId: val.key
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
          if (values.parId === undefined || values.parId === '') {
            values.parId = '-1'
          }
          return new Promise((resolve, reject) => {
            this.params.parId = values.parId
            this.params.name = values.name
            this.params.url = values.url
            this.params.interUrl = values.interUrl
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
              this._findTree()
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
