<template>
  <div>
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
            label="分包名称"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'name',
                {rules: [
                  { required: true, message: '请输入分包名称' }
                ]}
              ]"
              placeholder="请输入分包名称"
            />
          </a-form-item>
          <a-form-item
            label="分包预算"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              placeholder="请输入分包预算"
              v-decorator="[
                'budgetAmount',
                {rules: [
                  { required: true, message: '请输入分包预算' },
                ]}
              ]"
              :maxLength="25"
            />
          </a-form-item>
          <a-form-item
            label="采购形式"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-radio-group
              v-model="buyForm"
              :options="options">
              <!-- <a-radio :value="1">政府集中</a-radio>
              <a-radio :value="2">部门集中</a-radio> -->
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="采购方式"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-select
              style="width: 100%"
              placeholder="请选择采购方式"
              v-decorator="['buyWay']">
              <a-select-option :value="item.key" :key="index" v-for="(item,index) in acquisition">{{ item.name }}</a-select-option>
              <!-- <a-select-option value="2">单一来源</a-select-option>
              <a-select-option value="3">竞争性谈判</a-select-option>
              <a-select-option value="4">自行采购</a-select-option> -->
            </a-select>
          </a-form-item>
          <a-form-item
            label="评标地点"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="['biddingPlace']"
              placeholder="请输入评标地点"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { proPackage, getBuyWayParamByParamType, modifyPackage } from '@/api/project/info/index'
export default {
  props: {
    subpackage: {
      type: String,
      default: ''
    },
    listId: {
      type: String,
      default: ''
    },
    ids: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.form.resetFields()
        this.listId = ''
        this.buyForm = '1'
      }
    }
  },
  data () {
    return {
      maskClosable: false,
      acquisition: [],
      buyForm: '1',
      params: {},
      options: [
        { label: '政府集中', value: '1' },
        { label: '部门集中', value: '2' }
      ],
      option: [
        { label: '自行采购', value: '1' }
      ],
      confirmLoading: false,
      title: '',
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    open () {
      this.title = '项目预算新增'
      this.visible = true
      this.$nextTick(() => {
        this.params = {}
        this._getBuyWayParamByParamType()
        if (this.type === '2') {
          this.options = this.option
        } else {
          this.options = this.options
        }
      })
    },
    update () {
      this.title = '项目预算修改'
      this.visible = true
      this.$nextTick(() => {
        this._getBuyWayParamByParamType()
        if (this.type === '2') {
          this.options = this.option
        } else {
          this.options = this.options
        }
        this._modifyPackage(this.listId)
      })
    },
    handleCancel () {
      this.visible = false
    },
    _modifyPackage (id) {
      return new Promise((resolve, reject) => {
        modifyPackage({ id: id }).then(res => {
          this.params = res.data
          this.buyForm = res.data.buyForm
          this.form.setFieldsValue({
            name: res.data.name,
            budgetAmount: res.data.budgetAmount,
            biddingPlace: res.data.biddingPlace,
            buyWay: res.data.buyWay
          })
        })
      })
    },
    _getBuyWayParamByParamType () {
      return new Promise((resolve, reject) => {
        getBuyWayParamByParamType().then(res => {
          this.acquisition = res.data.buyWay
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.params.proId = this.subpackage
            this.params.name = values.name
            this.params.budgetAmount = values.budgetAmount
            this.params.buyForm = this.buyForm
            this.params.buyWay = values.buyWay
            this.params.biddingPlace = values.biddingPlace
            proPackage(this.params).then(res => {
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
              this.$emit('_modify', this.ids)
            })
          })
        }
      })
    }
  }
}
</script>
