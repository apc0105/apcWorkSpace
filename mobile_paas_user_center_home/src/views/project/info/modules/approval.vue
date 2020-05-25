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
              ]}
            ]"
            disabled
            placeholder="请输入项目名称"
          />
        </a-form-item>
        <a-form-item
          label="立项方式"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="['apprWay']"
            placeholder="请输入立项方式"
          />
        </a-form-item>
        <a-form-item
          label="会议日期"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['apprDate']"
            placeholder="请输入会议日期"
          />
        </a-form-item>
        <a-form-item
          label="立项附件"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            :fileList="fileListself"
            @preview="handlePreview"
            @change="handleChanges">
            <a-button> <a-icon type="upload" />上传</a-button>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import mixins from '@/mixin/index'
import { modify, saveList } from '@/api/project/info/index'
export default {
  watch: {
    visible: function () {
      if (!this.visible) {
        this.fileListself = []
        this.form.resetFields()
        this.params = {}
      }
    }
  },
  props: {
    ids: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fileListself: [],
      concatFile: '',
      params: {},
      confirmLoading: false,
      title: '',
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    open () {
      this.title = '项目立项'
      this.visible = true
      this.$nextTick(() => {
        this._modify(this.ids)
      })
    },
    handleChanges (info) {
      let fileList = [...info.fileList]
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = this.action + 'download/' + file.response.data[0].id
        }
        return file
      })
      this.fileListself = fileList
      this.concatFile = this.fileListself.concat(this.fileList)
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          console.log(res.data.fileKey)
          if (res.data.fileKey) {
            this.fileListself = JSON.parse(res.data.fileKey)
          } else {
            this.fileListself = []
          }
          this.form.setFieldsValue({
            proName: res.data.proName,
            apprWay: res.data.apprWay,
            apprDate: res.data.apprDate
          })
        })
      })
    },
    moment,
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.params.apprWay = values.apprWay
          this.params.apprDate = values.apprDate
          this.params.fileKey = JSON.stringify(this.concatFile)
          this.params.proState = 1
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
