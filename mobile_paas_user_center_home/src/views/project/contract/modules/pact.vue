<template>
  <a-modal
    :title="title"
    :maskClosable="maskClosable"
    :width="840"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="项目名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                disabled
                v-model="this.proName"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="分包名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                disabled
                v-model="this.childName"
                placeholder="请输入分包名称"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="供应商名称"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                style="width: 100%"
                placeholder="请输入供应商名称"
                v-decorator="[
                  'supId',
                  {rules: [
                    { required: true, message: '请输入供应商名称' },
                  ]}
                ]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="合同编号"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'conCode',
                  {rules: [
                    { required: true, message: '请输入合同编号' },
                    { validator: this.alidateRequire},
                  ]}
                ]"
                placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="合同金额(万元)"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'comAmount',
                  {rules: [
                    { required: true, message: '请输入合同金额（万元）' },
                    { validator: this.alidateRequire},
                  ]}
                ]"
                placeholder="请输入合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="合同签订时间"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-date-picker style="width: 100%" @change="onChange" :value="moment(round, 'YYYY-MM-DD')" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="付款方式"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-textarea
                :autosize="{ minRows: 3, maxRows: 6 }"
                style="width: 100%"
                placeholder="请输入付款方式"
                v-decorator="[
                  'payWay',
                ]"/>
            </a-form-item>
          </a-col>
          <!-- </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="是否转为固定资产"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }">
              <a-radio-group v-model="isAssets">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-item
              label="合同附件"
              :label-col="{ span:7 }"
              :wrapper-col="{ span: 16 }">
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
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-form-item>
              <a-button type="primary" html-type="submit" >添加</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :scroll="{x:1200}"
        :columns="columns"
        :dataSource="data">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleCard(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="handleCardDel(record)">删除</a>
          </template>
        </span>
      </a-table>
    </a-spin>
  </a-modal>
</template>
<script>
import moment from 'moment'
import mixins from '@/mixin/index'
import { isvalidRequire, isvalidPhone } from '@/utils/validate'
import { proContractModify, proContract, getProContractList, proContractDelete } from '@/api/project/info/index'
export default {
  props: {
    childIds: {
      type: String,
      default: ''
    },
    parentId: {
      type: String,
      default: ''
    },
    ids: {
      type: String,
      default: ''
    },
    proName: {
      type: String,
      default: ''
    },
    childName: {
      type: String,
      default: ''
    },
    selectedRowKeys: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
        this.params = {}
        this.fileList = []
      }
    }
  },
  data () {
    return {
      isAssets: 1,
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      title: '',
      columns: [
        {
          dataIndex: 'number',
          title: '序号'
        }, {
          dataIndex: 'conCode',
          key: 'conCode',
          title: '合同编号',
          scopedSlots: { customRender: 'conCode' }
        }, {
          dataIndex: 'comAmount',
          key: 'comAmount',
          title: '合同金额',
          scopedSlots: { customRender: 'comAmount' }
        }, {
          dataIndex: 'payTotal',
          key: 'payTotal',
          title: '付款合计',
          scopedSlots: { customRender: 'payTotal' }
        }, {
          dataIndex: 'wPayAmount',
          key: 'wPayAmount',
          title: '待付款金额',
          scopedSlots: { customRender: 'wPayAmount' }
        }, {
          dataIndex: 'wPayPid',
          key: 'wPayPid',
          title: '待付款比例',
          scopedSlots: { customRender: 'wPayPid' }
        }, {
          dataIndex: 'payWay',
          key: 'payWay',
          title: '付款方式',
          width: 300,
          scopedSlots: { customRender: 'payWay' }
        }, {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      parTree: '',
      visible: false,
      popover: false,
      treeData: [],
      params: {},
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChange (data, dateString) {
      this.round = dateString
    },
    moment,
    // 验证不能输入特殊字符
    alidateRequire (rule, value, callback) {
      if (!isvalidRequire(value) && value !== undefined) {
        callback(new Error('数据不能包含特殊字符'))
      } else {
        callback()
      }
    },
    handleReset () {
      this.form.resetFields()
      this.fileList = []
    },
    validPhone (rule, value, callback) {
      if (!isvalidPhone(value)) {
        callback(new Error('数据长度为11位'))
      } else {
        callback()
      }
    },
    handleCardDel (row) {
      const that = this
      this.$confirm({
        title: '此操作将永久删除该数据, 是否继续?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          proContractDelete({ id: row.id }).then(res => {
            if (res.retCode === 200) {
              that.$message.success(res.message)
              that._getProContractList()
            } else {
              that.$message.error(res.message)
            }
          })
        }
      })
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目合同'
        this._getProContractList()
      })
    },
    handleCard (row) {
      this._modify(row.id)
    },
    _getProContractList () {
      return new Promise((resolve, reject) => {
        getProContractList({ packageId: this.childIds, pageSize: 100, pageNo: 0 }).then(res => {
          this.data = res.data.content
          this.data.forEach((res, index) => {
            res.number = index + 1
          })
        })
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        proContractModify({ id: id }).then(res => {
          this.params = res.data
          this.round = res.data.conDate
          this.isAssets = parseInt(res.data.isAssets)
          if (res.data.fileKey) {
            this.fileList = JSON.parse(res.data.fileKey)
          } else {
            this.fileList = []
          }
          this.form.setFieldsValue({
            conCode: res.data.conCode,
            payWay: res.data.payWay,
            supId: res.data.supId,
            comAmount: res.data.comAmount
          })
        })
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.params.comAmount = values.comAmount
            this.params.conCode = values.conCode
            this.params.payWay = values.payWay
            this.params.conDate = this.round
            this.params.proId = this.ids
            this.params.packageId = this.childIds
            this.params.supId = values.supId
            this.params.isAssets = this.isAssets
            this.params.fileKey = JSON.stringify(this.fileList)
            proContract(this.params).then(res => {
              setTimeout(() => {
                this.confirmLoading = false
                this.$emit('ok', values)
              }, 200)
              if (res.retCode === 200) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              this._getProContractList()
              this.form.resetFields()
              this.fileList = []
            })
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.$emit('_modify', this.parentId)
    }
  },
  mixins: [mixins.upload]
}
</script>
