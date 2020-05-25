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
          label="小区名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-select
            style="width: 100%"
            placeholder="请选择小区名称"
            v-decorator="[
              'residenceId',
              {rules: [
                { required: true, message: '请选择小区名称' },
              ]}]">
            <a-select-option v-for="i in options" :key="i.id">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="车牌号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
              'carNum',
              {rules: [
                { required: true, message: '请输入车牌号' },
              ]}
            ]"
            placeholder="请输入车牌号"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
              'phone',
              {rules: [
                { required: true, message: '请输入联系电话' },
                { validator: this.validPhone},
              ]}
            ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item
          label="联系人"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
              'lineMan',
              {rules: [
                { required: true, message: '请输入联系人' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入联系人"
          />
        </a-form-item>
        <a-form-item
          label="车辆颜色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
              'carColour',
              {rules: [
                { required: true, message: '请输入车辆颜色' },
              ]}
            ]"
            placeholder="请输入车辆颜色"
          />
        </a-form-item>
        <a-form-item
          label="车牌颜色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-select
            style="width: 100%"
            placeholder="请选择车牌颜色"
            v-decorator="['licencePlateColour', {rules: [
              { required: true, message: '请选择车牌颜色' },
            ]}]">
            <a-select-option v-for="i in licenseColor" :key="i.key">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="是否常驻车辆"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }">
          <a-radio-group v-model="postStatus">
            <a-radio :value="0">否</a-radio>
            <a-radio :value="1">是</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
  </a-modal>
</template>
<script>
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { saveList, modify, findTree, licencePlateColour } from '@/api/vehicle/vehicleLibrary/index'
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
        this.postStatus = 0
      }
    }
  },
  data () {
    return {
      postStatus: 0,
      treeData: [],
      title: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      licenseColor: [],
      visible: false,
      popover: false,
      options: [],
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this._findTree()
    this._licencePlateColour()
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
    validPhone (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    },
    _findTree () {
      return new Promise((resolve, reject) => {
        findTree().then(res => {
          this.options = res.data
        })
      })
    },
    _licencePlateColour () {
      return new Promise((resolve, reject) => {
        licencePlateColour().then(res => {
          this.licenseColor = res.data
        })
      })
    },
    add () {
      this.visible = true
      this.title = '重点车辆库新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '重点车辆库修改'
        this._modify(this.$refs.hiddenInput.value)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          this.postStatus = parseInt(res.data.isResident)
          this.form.setFieldsValue({
            residenceId: res.data.residenceId,
            carNum: res.data.carNum,
            phone: res.data.phone,
            lineMan: res.data.lineMan,
            carColour: res.data.carColour,
            licencePlateColour: res.data.licencePlateColour
          })
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
          return new Promise((resolve, reject) => {
            this.params.residenceId = values.residenceId
            this.params.carNum = values.carNum
            this.params.phone = values.phone
            this.params.lineMan = values.lineMan
            this.params.carColour = values.carColour
            this.params.licencePlateColour = values.licencePlateColour
            this.params.isResident = this.postStatus
            this.params.isKeyMonitoring = '1'
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
