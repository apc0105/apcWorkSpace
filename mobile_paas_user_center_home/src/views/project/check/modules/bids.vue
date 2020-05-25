<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="840"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
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
              label="验收日期"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-date-picker
                style="width:100%;"
                @change="onChange"
                :value="moment(round, 'YYYY-MM-DD')"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="验收结论"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }">
              <a-radio-group v-model="checkResult">
                <a-radio :value="1">通过</a-radio>
                <a-radio :value="2">不通过</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="验收附件"
              :label-col="{ span:7 }"
              :wrapper-col="{ span: 16 }">
              <a-upload
                :action="action + 'upload'"
                :multiple="true"
                @preview="handlePreview"
                :fileList="fileList"
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
              <a-button type="primary" @click="handleCardAccept(record)" >保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :scroll="{x:1300}"
        :columns="columns"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :dataSource="data">
        <span slot="checkResult" slot-scope="text">
          <template v-if="text === '1'">通过</template>
          <template v-if="text === '2'">不通过</template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleCard(record)">修改</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleCardAccept(record)">验收</a> -->
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
import { proContractModify, getProContractList, saveByCheck } from '@/api/project/info/index'
export default {
  props: {
    childIds: {
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
      deleteList: [],
      selectedRowKeys: [],
      checkResult: 1,
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
          dataIndex: 'checkResult',
          key: 'checkResult',
          title: '验收结论',
          scopedSlots: { customRender: 'checkResult' }
        }, {
          dataIndex: 'checkDate',
          key: 'checkDate',
          title: '验收日期',
          scopedSlots: { customRender: 'checkDate' }
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
          dataIndex: 'wPayDate',
          key: 'wPayDate',
          title: '待付款时间',
          scopedSlots: { customRender: 'wPayDate' }
        }, {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 70,
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
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.deleteList = []
      selectedRows.forEach(val => {
        this.deleteList.push({ id: val.id, name: val.proName })
      })
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
    handleCardAccept (row) {
      if (this.deleteList.length !== 1) {
        this.$message.warning('请选择一个项目')
      } else {
        this.submitResult(this.deleteList[0].id)
      }
    },
    submitResult (id) {
      return new Promise((resolve, reject) => {
        this.params.checkResult = this.checkResult
        this.params.checkDate = this.round
        this.params.id = id
        this.params.checkFileKey = JSON.stringify(this.fileList)
        saveByCheck(this.params).then(res => {
          setTimeout(() => {
            this.confirmLoading = false
          }, 200)
          if (res.retCode === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this._getProContractList()
          this.form.resetFields()
          this.fileList = []
          this.selectedRowKeys = []
          this.deleteList = []
        })
      })
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
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目验收'
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
          if (res.data.checkDate) {
            this.round = res.data.checkDate
          }
          if (res.data.checkResult) {
            this.checkResult = parseInt(res.data.checkResult)
          }
          if (res.data.checkFileKey) {
            this.fileList = JSON.parse(res.data.checkFileKey)
          } else {
            this.fileList = []
          }
        })
      })
    },
    handleCancel () {
      this.visible = false
    }
  },
  mixins: [mixins.upload]
}
</script>
