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
    <div style="height:40px;">参数类型名称:<span style="margin-left:10px;margin-right:40px;">{{ this.param.name }}</span>  参数类型编码:<span style="margin-left:10px;">{{ this.param.code }}</span></div>
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="参数名称"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入参数名称' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="参数值"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'value',
                {rules: [{ required: true, message: '请输入参数值' }]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="参数序号"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }">
            <a-input
              v-decorator="[
                'sort',
                {rules: [{ required: true, message: '请输入参数序号' },{min:1,max:2,message:'序号长度在 1 到 2 个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item >
            <a-button
              type="primary"
              style="float:right"
              html-type="submit">
              保存
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
      :scroll="{ y: 300 }"
      :dataSource="data">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="confirm(record.id)">删除</a>
        </template>
      </span>
    </a-table>
  </a-modal>
</template>
<script>
import { getParamsList, saveParam, deleteSysParam } from '@/api/system/param/index'
const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: '参数名称',
  scopedSlots: { customRender: 'name' }
}, {
  title: '参数值',
  dataIndex: 'value',
  key: 'value'
}, {
  title: '参数排序',
  dataIndex: 'sort',
  key: 'sort'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]
export default {
  props: {
    rowss: {
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
    confirm (id) {
      const that = this
      this.$confirm({
        title: '此操作将永久删除该数据, 是否继续?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          deleteSysParam({ id: id }).then(res => {
            if (res.retCode === 200) {
              that.$message.success(res.message)
              that._getParamsList(that.$refs.hiddenInput.value)
            } else {
              that.$message.error(res.message)
            }
          })
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handleCancel () {
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          saveParam({ paramTypeId: this.$refs.hiddenInput.value, name: values.name, value: values.value, sort: values.sort }).then(res => {
            if (res.retCode === 200) {
              this._getParamsList(this.$refs.hiddenInput.value)
              this.form.resetFields()
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    handleAdd () {
      this.visible = true
      this.title = '参数配置'
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
