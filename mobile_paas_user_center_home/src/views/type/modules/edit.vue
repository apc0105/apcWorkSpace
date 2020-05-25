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
          label="标签名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [
                { required: true, message: '请输入标签名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入标签名称"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { updateResLabel, addResLabel } from '@/api/type'
import pick from 'lodash.pick'
export default {
  props: {
    record: {
      type: Object,
      default: () => {}
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
        createUser: 1,
        tenantId: 1,
        iconPath: '0',
        updateUser: 1
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
      this.title = '分类标签新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '分类标签修改'
        this.params.id = this.record.id
        this.form.setFieldsValue(pick(this.record, 'name'))
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            if (this.params.id !== '' && this.params.id !== undefined) {
              this.submitUpdate(values)
              this.confirmLoading = false
            } else {
              this.submitAdd(values)
              this.confirmLoading = false
            }
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    submitAdd (values) {
      this.params.name = values.name
      addResLabel(this.params).then(res => {
        this.success(res)
      })
    },
    submitUpdate (values) {
      this.params.name = values.name
      updateResLabel(this.params).then(res => {
        this.success(res)
        this.params.id = ''
      })
    },
    success (res) {
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 200)
      if (res.retCode === 200) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
      this.$emit('getList')
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
