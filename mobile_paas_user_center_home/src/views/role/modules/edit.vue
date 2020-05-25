<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="740"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="角色名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'name',
                  {rules: [
                    { required: true, message: '请输入角色名称' },
                  ]}
                ]"
                placeholder="请输入角色名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
              label="是否启用">
              <a-radio-group v-model="enableState">
                <a-radio :value="0">不启用</a-radio>
                <a-radio :value="1">启用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="所属服务"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-select
                placeholder="请选择所属服务"
                v-decorator="[
                  'serverId',
                  {rules: [
                    { required: true, message: '请选择所属服务' },
                  ]}]">
                <a-select-option v-for="item,index in appData" :key="item.appCode" :value="item.appCode">
                  {{ item.appName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="备注"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-textarea
                :rows="3"
                v-decorator="[
                  'roleDesc'
                ]"
                placeholder="请输入备注" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { save, modify } from '@/api/role'
import pick from 'lodash.pick'
import { getApplyMessages } from '@/api/classify'

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
      enableState: 0,
      id: '',
      maskClosable: false,
      title: '',
      option: [],
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
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this),
      appData: []
    }
  },
  created () {
    // this._findTree()
  },
  methods: {
    add () {
      this.visible = true
      this.title = '角色管理新增'
      this.id = ''
      this.getApplyMessages()
    },
    update () {
      this.visible = true
      this.getApplyMessages()
      this.$nextTick(() => {
        this.title = '角色管理修改'
        this._modify(this.record)
      })
    },
    _modify (record) {
      this.id = record.id
      this.form.setFieldsValue(pick(record, 'name', 'roleDesc', 'serverId'))
      this.enableState = parseInt(record.enableState)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            values.enableState = this.enableState
            values.id = this.id
            if (values.id !== '' && values.id !== undefined) {
              this.modifySubmit(values)
            } else {
              this.saveSubmit(values)
            }
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    saveSubmit (values) {
      const userId = JSON.parse(window.localStorage.message).id
      const userName = JSON.parse(window.localStorage.message).name
      const orgId = JSON.parse(window.localStorage.message).orgId
      this.params = values
      this.params.created = userId
      this.params.createdName = userName
      this.params.orgId = orgId
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
    },
    modifySubmit (values) {
      this.params = values
      modify(this.params).then(res => {
        if (res.retCode === 200) {
          this.$message.success(res.message)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
            this.$emit('getList')
          }, 200)
        } else if (res.retCode === 10004) {
          this.$message.error(res.message)
          this.confirmLoading = false
        } else {
          this.$message.error(res.message)
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    // 获取订购的服务
    getApplyMessages () {
      const orgId = JSON.parse(window.localStorage.message).orgId
      getApplyMessages(`/cfgApp/findAllByIsAuth/${orgId}`).then(res => {
        const { message, retCode, data } = res
        if (retCode === 200) {
          this.appData = data
        } else {
          this.$message.error(message)
        }
      })
    }
  }
}
</script>
