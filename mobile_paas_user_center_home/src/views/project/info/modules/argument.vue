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
              placeholder="请输入项目名称"/>
          </a-form-item>
          <a-form-item
            label="技术论证日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
                'telDate',
              ]"
              placeholder="请输入技术论证日期"/>
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
                'telDep'
              ]">
            </a-tree-select>
          </a-form-item>
          <a-form-item
            label="论证结论"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-textarea
              :rows="4"
              v-decorator="[
                'telConclus'
              ]"
              placeholder="请输入论证结论"
            />
          </a-form-item>
          <a-form-item
            label="论证附件"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-upload
              :action="action + 'upload'"
              :multiple="true"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange">
              <a-button> <a-icon type="upload" />上传</a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-form></a-spin>
  </a-modal>
</template>

<script>
import { modify, saveList } from '@/api/project/info/index'
import mixins from '@/mixin/index'
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    ids: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      params: {},
      action: this.$UPLOAD_URL.UPLOAD_URL,
      confirmLoading: false,
      title: '',
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    open () {
      this.title = '项目论证'
      this.visible = true
      this.$nextTick(() => {
        this._modify(this.ids)
      })
    },
    _modify (id) {
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.params = res.data
          if (res.data.apprFileKey) { this.fileList = JSON.parse(res.data.apprFileKey) } else {
            this.fileList = []
          }
          this.form.setFieldsValue({
            proName: res.data.proName,
            telDep: res.data.telDep,
            telConclus: res.data.telConclus,
            telDate: res.data.telDate
          })
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.params.telDep = values.telDep
          this.params.telConclus = values.telConclus
          this.params.telDate = values.telDate
          this.params.apprFileKey = JSON.stringify(this.fileList)
          saveList(this.params).then(res => {
            setTimeout(() => {
              this.visible = false
              this.$emit('ok', values)
            }, 200)
            if (res.retCode === 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.confirmLoading = false
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
