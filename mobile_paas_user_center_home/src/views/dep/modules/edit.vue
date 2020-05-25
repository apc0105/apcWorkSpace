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
          label="名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'depName',
              {rules: [
                { required: true, message: '请输入名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入名称" />
        </a-form-item>
        <a-form-item
          label="排序"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'depNum',
              {rules: [
                { required: true, message: '请输入排序' }
              ]}
            ]"
            placeholder="请输入排序" />
        </a-form-item>
        <a-form-item
          label="编号"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'depCode',
              {rules: [
                { required: true, message: '请输入编号' }
              ]}
            ]"
            placeholder="请输入编号" />
        </a-form-item>
        <a-form-item
          label="上级部门"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-tree-select
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择上级部门"
            treeDefaultExpandAll
            v-decorator="[
              'parId'
            ]">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-select
            placeholder="请选择状态"
            v-decorator="[
              'state',
              {rules: [
                { required: true, message: '请选择状态' },
              ]}
            ]">
            <a-select-option value="0">禁用</a-select-option>
            <a-select-option value="1">正常</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-textarea
            :rows="4"
            v-decorator="[
              'depDesc'
            ]"
            placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { modify } from '@/api/dep'
import { getTreeList } from '@/api/classify'
import { transform } from '@/utils/trans'
import pick from 'lodash.pick'
export default {
  props: {
    record: {
      type: Object,
      default: () => { }
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
      maskClosable: false,
      title: '',
      treeData: [],
      parTree: '',
      visible: false,
      popover: false,
      treeParams: {
        sessionOrgId: 1,
        sessionUserId: 1,
        pageSize: 100,
        pageNum: 0
      },
      params: {
        orgId: 665158166039756800
      },
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // // 验证不能输入特殊字符
    alidateRequire (rule, value, callback) {
      if (!isvalidRequire(value) && value !== undefined) {
        callback(new Error('数据不能包含特殊字符'))
      } else {
        callback()
      }
    },
    add () {
      this.visible = true
      this.title = '部门管理新增'
      this._findTree()
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this._findTree()
        this.title = '部门管理修改'
        this.params.id = this.record.id
        if (this.record.parId === '0') {
          this.form.setFieldsValue({
            parId: '无'
          })
          this.form.setFieldsValue(pick(this.record, 'depCode', 'depName', 'depNum', 'state', 'depDesc'))
        } else {
          this.form.setFieldsValue(pick(this.record, 'depCode', 'depName', 'depNum', 'parId', 'state', 'depDesc'))
        }
      })
    },
    _findTree () {
      return new Promise((resolve, reject) => {
        var id = '665158166039756800'
        getTreeList(id).then(res => {
          res.data.forEach(res => {
            res.title = res.depName
            res.key = res.id
            res.value = res.id
          })
          res.data.push({title:'无',key:'0',value:'0'})
          this.treeData = transform(res.data, 'id', 'parId', 'children')
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.params.depCode = values.depCode
            this.params.depName = values.depName
            this.params.depNum = parseInt(values.depNum)
            if (values.parId === '无') {
              this.params.parId = '0'
            } else if (values.parId === undefined) {
              this.params.parId = '0'
            } else {
              this.params.parId = values.parId
            }
            console.log(this.params.parId, values.parId)
            this.params.state = values.state
            this.params.depDesc = values.depDesc
            modify(this.params).then(res => {
              setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
              }, 200)
              if (res.retCode === 200) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              this.params.id = ''
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
