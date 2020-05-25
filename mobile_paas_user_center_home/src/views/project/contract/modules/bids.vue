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
          label="项目名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            disabled
            v-model="proName"
            placeholder="请输入项目名称"/>
        </a-form-item>
        <!-- <a-form-item
          label="分包名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            disabled
            v-decorator="['name']"
            placeholder="请输入分包名称"/>
        </a-form-item> -->
        <template v-if="this.proType === '1'">
          <a-form-item
            label="招标代理机构"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-select
              style="width: 100%"
              placeholder="请选择招标代理机构"
              v-decorator="['biddingUnit']">
              <a-select-option v-for="item in organ" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="招标日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-date-picker
              style="width:100%;"
              @change="onChange"
              :value="moment(round, 'YYYY-MM-DD')"/>
          </a-form-item>
        </template>
        <template v-if="this.proType === '2'">
          <a-form-item
            label="招标代理机构"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="['biddingUnit']"
              placeholder="请输入招标代理机构"/>
          </a-form-item>
          <a-form-item
            label="招标日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="['biddingDate']"
              placeholder="请输入招标日期(年-月-日)"/>
          </a-form-item>
        </template>
        <a-form-item
          label="历史招标日期"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['biddingDateHis']"
            placeholder="请输入历史招标日期"/>
        </a-form-item>
        <a-form-item
          label="招标附件"
          :label-col="{ span:6 }"
          :wrapper-col="{ span: 12 }">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange">
            <a-button><a-icon type="upload" />上传</a-button>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>

        </a-form-item>
        <!-- <a-form-item
          label="供应商名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-select
            style="width: 100%"
            placeholder="请选择供应商名称"
            v-decorator="[
              'supId',
              {rules: [
                { required: true, message: '请选择供应商名称' },
                { validator: this.alidateRequire},
              ]}
            ]">
            <a-select-option v-for="item in info" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import moment from 'moment'
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { modify, saveList, getBidding } from '@/api/project/info/index'
import mixins from '@/mixin/index'
export default {
  props: {
    ids: {
      type: String,
      default: ''
    },
    proName: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
        this.params = {}
        this.round = moment(new Date().toLocaleDateString()).format('YYYY-MM-DD')
      }
    }
  },
  data () {
    return {
      proType: '1',
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'), // moment(new Date())
      title: '',
      parTree: '',
      visible: false,
      popover: false,
      treeData: [],
      params: {},
      confirmLoading: false,
      value: '',
      organ: [],
      info: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    this._getBidding(1)
    this._getBidding(2)
  },
  methods: {
    moment,
    _getBidding (type) {
      return new Promise((resolve, reject) => {
        getBidding({ type: type }).then(res => {
          if (type === 1) {
            this.organ = res.data
          } else if (type === 2) {
            this.info = res.data
          }
        })
      })
    },
    onChange (data, dateString) {
      this.round = dateString
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
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目招标'
        this._modify(this.ids)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.proType = res.data.proType
          this.params.id = res.data.id
          this.params = res.data
          this.proName = res.data.proName
          if (this.proType === '1') {
            if (res.data.biddingDate) {
              this.round = res.data.biddingDate
            }
          } else if (this.proType === '2') {
            this.$nextTick(() => {
              this.form.setFieldsValue({
                biddingDateHis: res.data.biddingDateHis,
                biddingUnit: res.data.biddingUnit,
                biddingDate: res.data.biddingDate
              })
            })
          }
          this.form.setFieldsValue({
            name: res.data.name,
            biddingDateHis: res.data.biddingDateHis,
            biddingUnit: res.data.biddingUnit,
            biddingDate: res.data.biddingDate
          })
          if (res.data.biddingFileKey) {
            this.fileList = JSON.parse(res.data.biddingFileKey)
          } else {
            this.fileList = []
          }
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            if (this.proType === '1') {
              this.params.biddingDate = this.round
            } else {
              this.params.biddingDate = values.biddingDate
            }
            this.params.proState = 2
            this.params.biddingUnit = values.biddingUnit
            this.params.biddingDateHis = values.biddingDateHis
            this.params.biddingFileKey = JSON.stringify(this.fileList)
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
  },
  mixins: [mixins.upload]
}
</script>
