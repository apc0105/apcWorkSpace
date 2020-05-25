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
          label="部门名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'depName',
              {rules: [
                { required: true, message: '请输入部门名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入部门名称"
          />
        </a-form-item>
        <a-form-item
          label="单位"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-tree-select
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择单位名称"
            v-decorator="[
              'depParid'
            ]"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            :rows="4"
            v-decorator="[
              'remark'
            ]"
            placeholder="请输入备注"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>

<script>
import { transform } from '@/utils/trans'
import { isvalidRequire } from '@/utils/validate'
import { saveList, modify, findTree } from '@/api/system/dep/index'

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
      this.title = '部门管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '部门管理修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          if (res.data.depParid !== '-1') {
            this.form.setFieldsValue({
              depName: res.data.depName,
              depParid: res.data.depParid,
              remark: res.data.remark
            })
          } else {
            this.form.setFieldsValue({
              depName: res.data.depName,
              remark: res.data.remark
            })
            res.data.depParid = '-1'
          }
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (values.depParid === undefined || values.depParid === '') {
            values.depParid = '-1'
          }
          return new Promise((resolve, reject) => {
            this.params.depName = values.depName
            this.params.depParid = values.depParid
            this.params.remark = values.remark
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
