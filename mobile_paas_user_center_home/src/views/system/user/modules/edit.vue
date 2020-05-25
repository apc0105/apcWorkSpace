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
          <a-select
            placeholder="请选择角色名称"
            v-decorator="[
              'roleId',
              {rules: [{ required: true, message: '请选择角色名称' }]}
            ]">
            <a-select-option v-for="item in roles" :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="部门名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }">
          <a-tree-select
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择部门名称"
            v-decorator="[
              'depId'
            ]"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="用户帐号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'account',
              {rules: [
                { required: true, message: '请输入用户帐号' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入用户帐号"
          />
        </a-form-item>
        <a-form-item
          label="用户姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入用户姓名' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入用户姓名"
          />
        </a-form-item>
        <a-form-item
          label="手机号码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            v-decorator="[
              'mobile',
              {rules: [
                { required: true, message: '请输入手机号码' },
                { validator: this.validPhone}
              ]}
            ]"
            placeholder="请输入手机号码"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { saveUserList, modify } from '@/api/system/user/index'
import { findTree } from '@/api/system/dep/index'
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
      option: [],
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
        areaId: keys[0]
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
    // 验证手机号码
    validPhone (rule, value, callback) {
      if (!isvalidPhone(value) && value !== undefined) {
        callback(new Error('手机号码不正确'))
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
      this.title = '用户管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '用户管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          if (res.data.depId !== '-1') {
            this.form.setFieldsValue({
              name: res.data.name,
              mobile: res.data.mobile,
              account: res.data.account,
              roleId: res.data.roleId,
              depId: res.data.depId,
              residenceId: res.data.residenceId
            })
          } else {
            this.form.setFieldsValue({
              name: res.data.name,
              mobile: res.data.mobile,
              account: res.data.account,
              roleId: res.data.roleId,
              depId: res.data.depId,
              residenceId: res.data.residenceId
            })
            res.data.depId = '-1'
          }
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (values.depId === undefined || values.depId === '') {
            values.depId = '-1'
          }
          return new Promise((resolve, reject) => {
            this.params.roleId = values.roleId
            this.params.depId = values.depId
            this.params.account = values.account
            this.params.name = values.name
            this.params.mobile = values.mobile
            this.params.residenceId = values.residenceId
            this.params.id = this.$refs.hiddenInput.value
            saveUserList(this.params).then(res => {
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
