<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="8">
            <a-form-item
              label="项目名称"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                disabled
                v-model="this.proName"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="合同编号"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }">
              <a-input
                disabled
                v-model="this.conCode"
                placeholder="请输入合同编号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="分包名称"
              :label-col="{ span: 6 }"
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
          <a-col :span="8">
            <a-form-item
              label="付款金额(万元)"
              :label-col="{ span: 10 }"
              :wrapper-col="{ span: 12 }">
              <a-input
                v-decorator="[
                  'payAmount',
                  {rules: [
                    { required: true, message: '请输入付款金额(万元)' },
                    { validator: this.validNumber},
                  ]}
                ]"
                placeholder="请输入付款金额(万元)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="付款次数"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 15 }">
              <a-select v-decorator="['payNum']" placeholder="请选择付款次数">
                <a-select-option value="第1次">第1次</a-select-option>
                <a-select-option value="第2次">第2次</a-select-option>
                <a-select-option value="第3次">第3次</a-select-option>
                <a-select-option value="第4次">第4次</a-select-option>
                <a-select-option value="第5次">第5次</a-select-option>
                <a-select-option value="第6次">第6次</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- <a-form-item
              label="付款时间"
              :label-col="{ span: 7}"
              :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'payWay',
                  {rules: [
                    { required: true, message: '请输入付款方式' },
                  ]}
                ]"
                placeholder="请输入付款方式"
              />
            </a-form-item> -->
            <a-form-item
              label="付款时间"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 15 }">
              <a-date-picker
                style="width:100%;"
                @change="onChanges"
                :value="moment(round, 'YYYY-MM-DD')"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item >
              <a-button type="primary" style="float:right" html-type="submit"> 保存 </a-button>
              <a-button style="float:right;margin-right:10px;" @click="handleReset"> 置空 </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <a-table :columns="columns" :dataSource="data" bordered>
      <!-- <template v-for="col in ['packageId','proId','conId','payAmount','payNum','payDate']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <template v-if="record.editable">
            <a-select v-if="col === 'payNum'" size="small" :defaultValue="text" style="width:100%;" @change="e => handleChange(e.target.value, record.id, col)">
              <a-select-option value="第1次">第1次</a-select-option>
              <a-select-option value="第2次">第2次</a-select-option>
              <a-select-option value="第3次">第3次</a-select-option>
              <a-select-option value="第4次">第4次</a-select-option>
              <a-select-option value="第5次">第5次</a-select-option>
              <a-select-option value="第6次">第6次</a-select-option>
            </a-select>
            <a-input v-else size="small" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.id, col)"/>
          </template>
          <template v-else>{{ text }}</template>
        </div>
      </template> -->
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <!-- <span v-if="record.editable">
            <a @click="() => save(record.id)">保存</a>
            <a-popconfirm title="确定取消吗?" @confirm="() => cancel(record.id)">
              <a>取消</a>
            </a-popconfirm>
          </span> -->
          <span>
            <a @click="() => edit(record)">修改</a>
          </span>
          <a @click="deleteOne(record)">删除</a>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>
<script>
import moment from 'moment'
import { isvalidRequire, isvalidPhone, isvalidMoney } from '@/utils/validate'
import { getListByConId, proContractPaySave, proContractPayDelete } from '@/api/project/info/index'
const columns = [
  // {
  //   dataIndex: 'packageId',
  //   key: 'packageId',
  //   title: '分包名称'
  // }, {
  //   title: '项目名称',
  //   dataIndex: 'proId',
  //   key: 'proId'
  // }, {
  //   title: '合同编号',
  //   dataIndex: 'conId',
  //   key: 'conId'
  // },
  {
    dataIndex: 'payAmount',
    key: 'payAmount',
    title: '付款金额（万元）',
    scopedSlots: { customRender: 'payAmount' }
  }, {
    title: '付款次数',
    dataIndex: 'payNum',
    key: 'payNum',
    scopedSlots: { customRender: 'payNum' }
  }, {
    title: '付款时间',
    dataIndex: 'payDate',
    key: 'payDate',
    scopedSlots: { customRender: 'payDate' }
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  props: {
    packageId: {
      type: String,
      default: ''
    },
    comAmount: {
      type: String,
      default: ''
    },
    ids: {
      type: String,
      default: ''
    },
    childName: {
      type: String,
      default: ''
    },
    proName: {
      type: String,
      default: ''
    },
    childIds: {
      type: String,
      default: ''
    },
    conCode: {
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
      }
    }
  },
  data () {
    return {
      maskClosable: false,
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      title: '',
      data: [],
      columns,
      subpackage: '',
      contract: '',
      parTree: '',
      visible: false,
      sum: 0,
      popover: false,
      treeData: [],
      params: {},
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    deleteOne (row) {
      return new Promise((resolve, reject) => {
        proContractPayDelete({ id: row.id }).then(res => {
          if (res.retCode === 200) {
            this._getListByConId(this.packageId)
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    validNumber (rule, value, callback) {
      if (!isvalidMoney(value)) {
        callback(new Error('只能输入数字,最多保留两位小数'))
      } else {
        const form = this.form
        const payAmount = form.getFieldValue('payAmount')
        this.sum = 0
        for (let index = 0; index < this.data.length; index++) {
          this.sum += parseFloat(this.data[index].payAmount)
        }
        if (parseFloat(this.parComAmount) >= this.sum + parseFloat(payAmount)) {
          callback()
        } else {
          callback(new Error('付款金额不能大于合同总金额！'))
        }
      }
    },
    // handleChange (value, id, column) {
    //   console.log(value, id, column)
    //   const newData = [...this.data]
    //   const target = newData.filter(item => id === item.id)[0]
    //   if (target) {
    //     target[column] = value
    //     this.data = newData
    //   }
    // },
    edit (row) {
      this.round = row.payDate
      this.params = row
      this.form.setFieldsValue({
        payAmount: row.payAmount,
        payNum: row.payNum
      })
      // const newData = [...this.data]
      // const target = newData.filter(item => id === item.id)[0]
      // if (target) {
      //   target.editable = true
      //   this.data = newData
      // }
    },
    // save (id) {
    //   const newData = [...this.data]
    //   const target = newData.filter(item => id === item.id)[0]
    //   if (target) {
    //     delete target.editable
    //     this.params.conId = target.conId
    //     this.params.id = target.id
    //     this.params.isFlag = target.isFlag
    //     this.params.packageId = target.packageId
    //     this.params.payAmount = target.payAmount
    //     this.params.payDate = target.payDate
    //     this.params.proId = target.proId
    //     this._proContractPaySave()
    //   }
    // },
    _proContractPaySave () {
      return new Promise((resolve, reject) => {
        proContractPaySave(this.params).then(res => {
          if (res.retCode === 200) {
            this._getListByConId(this.packageId)
            this.form.resetFields()
            this.params = {}
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // cancel (id) {
    //   const newData = [...this.data]
    //   const target = newData.filter(item => id === item.id)[0]
    //   if (target) {
    //     delete target.editable
    //     this.data = newData
    //   }
    // },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.params.payAmount = values.payAmount
          this.params.payNum = values.payNum
          // this.params.payWay = values.payWay
          this.params.proId = this.ids // 项目id
          this.params.packageId = this.childIds
          this.params.conId = this.packageId
          this.params.payDate = this.round
          this._proContractPaySave()
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    onChanges (data, dateString) {
      this.round = dateString
    },
    _getListByConId (id) {
      return new Promise((resolve, reject) => {
        getListByConId({ conId: id }).then(res => {
          this.data = res.data
          this.contract = res.data[0].conId
          this.subpackage = res.data[0].packageId
          this.proName = res.data[0].proId
        })
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
        this.title = '项目付款'
        this.parComAmount = this.comAmount
        this._getListByConId(this.packageId)
      })
    },
    handleCancel () {
      this.visible = false
      this.$emit('_getProContractList')
    }
  }
}
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
