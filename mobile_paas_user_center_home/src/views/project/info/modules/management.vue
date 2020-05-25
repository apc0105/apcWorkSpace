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
          label="项目名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'proName',
              {rules: [
                { required: true, message: '请输入项目名称' },
                { validator: this.alidateRequire},
              ]}
            ]"
            disabled
            placeholder="请输入项目名称"
          />
        </a-form-item>
        <template v-if="rowss.type==='lx'">
          <a-form-item
            label="立项方式"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'apprWay',
                {rules: [
                  { required: true, message: '请输入立项方式' },
                  { validator: this.alidateRequire},
                ]}
              ]"
              placeholder="请输入立项方式"
            />
          </a-form-item>
          <!-- <a-form-item
          label="立项方式"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-select
            style="width: 100%"
            v-decorator="[
              'apprWay',
              {rules: [
                { required: true, message: '请输入立项方式' },
              ]}
            ]"
            placeholder="请选择项目类型">
            <a-select-option value="1">集中采购项目</a-select-option>
            <a-select-option value="2">自行采购项目</a-select-option>
            <a-select-option value="3">其他</a-select-option>
          </a-select>
        </a-form-item> -->
          <a-form-item
            label="立项日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-date-picker
              style="width:100%;"
              @change="onChange"
              :value="moment(round, 'YYYY-MM-DD')"/>
          </a-form-item>
        </template>
        <template v-if="rowss.type==='lz'">
          <a-form-item
            label="	技术论证日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-date-picker
              style="width:100%;"
              @change="technologyonChange"
              :value="moment(technologyround, 'YYYY-MM-DD')"/>
          </a-form-item>
          <a-form-item
            label="论证部门"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tree-select
              style="width: 100%"
              :treeData="treeData"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择论证部门"
              v-decorator="[
                'telDep',
                {
                  rules:[
                    { required: true, message: '请选择论证部门' },
                  ]
                }
              ]">
            </a-tree-select>
          </a-form-item>
          <a-form-item
            label="论证结论"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-textarea
              v-decorator="[
                'telConclus',
                {rules: [
                  { required: true, message: '请输入论证结论' },
                  { validator: this.alidateRequire},
                ]}
              ]"
              placeholder="请输入论证结论"
            />
          </a-form-item>
          <a-form-item
            label="附件"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
          </a-form-item>
        </template>
        <template v-if="rowss.type==='ys'">
          <a-form-item
            label="总预算（万元）"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
              <span slot="title" v-if="value" class="numeric-input-title">
                {{ value !== '-' ? formatNumber(value) : '-' }}
              </span>
              <template slot="title" v-else>请输入预算金额</template>
              <a-input
                :value="value"
                @change="onChanges"
                @blur="onBlur"
                placeholder="请输入总预算"
                v-decorator="[
                  'totalFound',
                  {rules: [
                    { required: true, message: '请输入总预算' },
                  ]}
                ]"
                :maxLength="25"
              />
            </a-tooltip>
          </a-form-item>
          <a-form-item
            label="财政资金（万元）"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
              <span slot="title" v-if="value" class="numeric-input-title">
                {{ value !== '-' ? formatNumber(value) : '-' }}
              </span>
              <template slot="title" v-else>请输入财政资金</template>
              <a-input
                :value="value"
                @change="onChanges"
                @blur="onBlur"
                placeholder="请输入财政资金"
                v-decorator="[
                  'financialFound',
                  {rules: [
                    { required: true, message: '请输入财政资金' },
                  ]}
                ]"
                :maxLength="25"
              />
            </a-tooltip>
          </a-form-item>
          <a-form-item
            label="分包名称"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'name',
                {rules: [
                  { required: true, message: '请输入分包名称' },
                  { validator: this.alidateRequire},
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
              :value="value"
              @change="onChanges"
              @blur="onBlur"
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
        </template>
        <template v-if="rowss.type==='yss'">
          <a-form-item
            label="验收日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-date-picker
              style="width:100%;"
              @change="onChange"
              :value="moment(acceptround, 'YYYY-MM-DD')"/>
          </a-form-item>
          <a-form-item
            label="验收结论"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-textarea
              v-decorator="[
                'checkResult',
                {rules: [
                  { required: true, message: '请输入验收结论' },
                  { validator: this.alidateRequire},
                ]}
              ]"
              placeholder="请输入验收结论"
            />
          </a-form-item>
        </template>
        <!-- <a-form-item
          label="承办部门"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-tree-select
            style="width: 100%"
            :treeData="treeData"
            placeholder="请选择承办部门"
            v-decorator="[
              'depId',
              {
                rules:[
                  { required: true, message: '请选择承办部门' },
                ]
              }
            ]">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="项目概述"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'proContent',
              {rules: [
                { required: true, message: '请输入项目概述' },
              ]}
            ]"
            placeholder="请输入项目概述"
          />
        </a-form-item>
        <a-form-item
          label="立项方式"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
              'apprWay',
              {rules: [
                { required: true, message: '请输入立项方式' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入立项方式"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-textarea
            v-decorator="[
              'remark',
              {rules: [
                { required: true, message: '请输入备注' },
                { validator: this.alidateRequire},
              ]}
            ]"
            placeholder="请输入备注"
          />
        </a-form-item>
        <a-form-item
          label="附件"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
        </a-form-item> -->
      </a-form>
    </a-spin>
    <!-- <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput"> -->
  </a-modal>
</template>

<script>
import moment from 'moment'
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { saveList, modify, saveListYs } from '@/api/project/info/index'
function formatNumber (value) {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}
export default {
  props: {
    rowss: {
      type: Object,
      required: true
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
        this.params = {}
      }
    }
  },
  data () {
    return {
      maskClosable: false,
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      technologyround: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      acceptround: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      title: '',
      parTree: '',
      visible: false,
      popover: false,

      params: {},
      paramsYs: {},
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    formatNumber,
    onChanges (e) {
      const { value } = e.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value
      }
    },
    onBlur () {
      const { value, onChange } = this
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        onChange({ value: value.slice(0, -1) })
      }
    },
    moment,
    onChange (data, dateString) {
      this.round = dateString
    },
    technologyonChange (data, dateString) {
      this.technologyround = dateString
    },
    acceptroundonChange (data, dateString) {
      this.acceptround = dateString
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
      if (!isvalidPhone(value)) {
        callback(new Error('数据长度为11位'))
      } else {
        callback()
      }
    },
    add () {
      this.visible = true
      this.title = '供应商信息管理新增'
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = this.rowss.name
        this._modify(this.rowss.id)
        this._modifyYs(this.rowss.id)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          if (res.data.apprDate === '' || !res.data.apprDate) {
            this.round = new Date().toLocaleDateString()
          } else {
            this.round = res.data.apprDate
          }
          if (res.data.telDate === '' || !res.data.telDate) {
            this.technologyround = new Date().toLocaleDateString()
          } else {
            this.technologyround = res.data.telDate
          }
          if (res.param.proPackage.checkDate === '' || !res.param.proPackage.checkDate) {
            this.acceptround = new Date().toLocaleDateString()
          } else {
            this.acceptround = res.param.proPackage.checkDate
          }

          if (!res.param.proPackage) {
            this.paramsYs.name = ''
            this.paramsYs.budgetAmount = ''
            this.paramsYs.proId = id
          } else {
            this.paramsYs = res.param.proPackage
          }
          this.params = res.data
          this.form.setFieldsValue({
            proName: res.data.proName,
            apprWay: res.data.apprWay,
            apprDate: this.round,
            telDate: this.technologyround,
            telDep: res.data.telDep,
            telConclus: res.data.telConclus,
            totalFound: res.data.totalFound,
            financialFound: res.data.financialFound,
            name: this.paramsYs.name,
            budgetAmount: this.paramsYs.budgetAmount,
            checkDate: this.acceptround,
            checkResult: res.param.proPackage.checkResult

            // proType: res.data.proType,
            // proContent: res.data.proContent,
            // remark: res.data.remark,
            // depId: res.data.depId
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
            this.params.proName = values.proName
            this.params.apprWay = values.apprWay
            this.params.apprDate = this.round
            this.params.telDate = this.technologyround
            this.params.telDep = values.telDep
            this.params.telConclus = values.telConclus
            this.params.totalFound = values.totalFound
            this.params.financialFound = values.financialFound

            this.paramsYs.name = values.name
            this.paramsYs.budgetAmount = values.budgetAmount
            this.paramsYs.checkDate = this.acceptround
            this.paramsYs.checkResult = values.checkResult
            if (this.rowss.type === 'lx') {
              this.params.proState = '1'
            }

            // this.params.proType = values.proType
            // this.params.proContent = values.proContent
            // this.params.remark = values.remark
            // this.params.depId = values.depId

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
            saveListYs(this.paramsYs).then(res => {
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
      this.$emit('noSelectChange')
    }
  }
}
</script>
