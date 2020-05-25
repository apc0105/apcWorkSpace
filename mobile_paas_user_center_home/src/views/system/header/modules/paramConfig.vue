<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="760"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :footer="null">
    <input :value="rowss" type="hidden" ref="hiddenInput" id="hiddenInput">
    <input :value="yearss" type="hidden" ref="hiddenInputYear" id="hiddenInputYear">
    <input :value="tableNamess" type="hidden" ref="hiddenInputTableName" id="hiddenInputTableName">
    <input :value="proTypess" type="hidden" ref="hiddenInputProType" id="hiddenInputProType">

    <!-- <div style="height:40px;">参数类型名称:<span style="margin-left:10px;margin-right:40px;">{{ this.param.num }}</span>  参数类型编码:<span style="margin-left:10px;">{{ this.param.code }}</span></div> -->
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="表头序号"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'num',
                {rules: [{ required: true, message: '请输入表头序号' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="表头名称"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入表头名称' }]}
              ]"
            />
          </a-form-item>
          <!-- ,{min:1,max:2,message:'序号长度在 1 到 2 个字符'} -->
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="表头编码"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'code',
                {rules: [{ required: true, message: '请输入表头编码' },
                         { validator: validNum},
                ]}
              ]"

            />
            <!--{ validator: this.validNum} -->
            </a-input></a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item >
            <a-button
              type="primary"
              style="float:right"
              html-type="submit">
              确定
            </a-button>
            <a-button
              style="float:right;margin-right:10px;"
              @click="handleReset">
              置空
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :columns="columns"
      :pagination="false"
      :dataSource="data"
      :scroll="{ y: 300 }">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="confirm(record)">删除</a>
        </template>
      </span>
    </a-table>
    <div style="text-align: right;margin-top: 15px;">
      <a-button type="primary" @click="save">保存</a-button>
    </div>

  </a-modal>
</template>
<script>
import { getParamsList, saveParam, deleteSysParam, findCode } from '@/api/system/header/index'
import { isvalidNumber } from '@/utils/validate'
const columns = [{
  dataIndex: 'num',
  key: 'num',
  title: '表头序号',
  width: '25%'
}, {
  title: '表头名称',
  dataIndex: 'name',
  key: 'name',
  width: '25%'
}, {
  title: '表头编码',
  dataIndex: 'code',
  key: 'code',
  width: '25%'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
  width: '25%'
}]
export default {
  props: {
    rowss: {
      type: String,
      default: ''
    },
    yearss: {
      type: String,
      default: ''
    },
    tableNamess: {
      type: String,
      default: ''
    },
    proTypess: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      maskClosable: false,
      title: '',
      visible: false,
      columns,
      data: [],
      confirmLoading: false,
      param: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 验证不能输入数字
    validNum (rule, value, callback) {
      if (isvalidNumber(value) && value !== undefined) {
        callback(new Error('数据不能包含数字'))
      } else {
        callback()
      }
    },
    confirm (obj) {
      const that = this
      this.$confirm({
        title: '此操作将删除该数据, 是否继续?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          that.removeByValue(that.data, obj)
          if (obj.id !== '') {
            deleteSysParam({ id: obj.id }).then(res => {
              if (res.retCode === 200) {
                that.$message.success(res.message)
              } else {
                that.$message.error(res.message)
              }
            })
          }
        }
      })
    },
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          break
        }
      }
    },
    handleReset () {
      this.form.resetFields()
    },
    handleCancel () {
      this.form.resetFields()
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.data.push({ id: '', num: values.num, name: values.name, code: values.code })
          // this.form.resetFields()
          // console.log(this.data)
          findCode({ code: values.code, configId: this.$refs.hiddenInput.value }).then(res => {
            var num = 0
            if (res.retCode === 200) {
              for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].code !== values.code) {
                  num++
                }
              }
              if (num === this.data.length) {
                this.data.push({ id: '', num: values.num, name: values.name, code: values.code })
                this.form.resetFields()
                this.$message.success(res.message)
              } else {
                this.$message.error('信息重复,保存信息失败')
              }
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    save () {
      saveParam({ proType: this.$refs.hiddenInputProType.value, tableName: this.$refs.hiddenInputTableName.value, configId: this.$refs.hiddenInput.value, year: this.$refs.hiddenInputYear.value, configFile: JSON.stringify(this.data) }).then(res => {
        if (res.retCode === 200) {
          // this._getParamsList(this.$refs.hiddenInput.value)
          this.form.resetFields()
          this.$message.success(res.message)
          this.handleCancel()
          this.$emit('getList')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleAdd () {
      this.visible = true
      this.title = '表头配置'
      this.$nextTick(() => {
        this._getParamsList(this.$refs.hiddenInput.value)
      })
    },
    _getParamsList (id) {
      return new Promise((resolve, reject) => {
        getParamsList({ id: id }).then(res => {
          this.param = res.param
          this.data = res.data
        })
      })
    }
  }
}
</script>
