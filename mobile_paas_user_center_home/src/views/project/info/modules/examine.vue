<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="640"
      :visible="visible"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <detail-list class="detail-layout">
        <detail-list-item-two term="项目名称">{{ params.proName }}</detail-list-item-two>
        <detail-list-item-two term="项目类型">
          <template v-if="params.proType==='1'">集中采购项目</template>
          <template v-if="params.proType==='2'">自行采购项目</template>
        </detail-list-item-two>
        <detail-list-item-two term="会议日期">{{ params.apprDate }}</detail-list-item-two>
        <detail-list-item-two term="承办部门">{{ params.depId }}</detail-list-item-two>
        <detail-list-item-two term="立项方式">{{ params.apprWay }}</detail-list-item-two>
        <!-- <detail-list-item-two term="立项日期">{{ params.apprDate }}</detail-list-item-two> -->
        <detail-list-item-one term="项目概述">{{ params.proContent }}</detail-list-item-one>
        <detail-list-item-two term="技术论证日期">{{ params.telDate }}</detail-list-item-two>
        <detail-list-item-two term="论证部门">{{ params.telDep }}</detail-list-item-two>
        <detail-list-item-one term="论证结论">{{ params.telConclus }}</detail-list-item-one>
        <detail-list-item-two term="总预算(万元)">{{ params.totalFound }}</detail-list-item-two>
        <detail-list-item-two term="财政资金(万元)">{{ params.financialFound }}</detail-list-item-two>
        <detail-list-item-two term="审批单位">{{ params.auditUnit }}</detail-list-item-two>
        <detail-list-item-two term="审批日期">{{ params.auditDate }}</detail-list-item-two>
        <detail-list-item-two term="项目状态">
          <template v-if="params.proState==='1'">立项</template>
          <template v-if="params.proState==='2'">招标</template>
          <template v-if="params.proState==='3'">验收</template>
          <template v-if="params.proState==='4'">付款</template>
          <template v-if="params.proState==='5'">完成</template>
        </detail-list-item-two>
        <!-- <detail-list-item-two term="抽取专家数">{{ params.diddingNum }}</detail-list-item-two> -->
        <detail-list-item-one term="备注">{{ params.remark }}</detail-list-item-one>
        <detail-list-item-two term="立项附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            class="closeDis"
            @preview="handlePreview"
            :fileList="fileList"
            @change="handleChange">
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-two>
        <detail-list-item-two term="论证附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            @preview="handlePreview"
            class="closeDis"
            :fileList="fileLists"
            @change="handleChanges">
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-two>
        </detail-list-item-two></detail-list>
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item
            label="审批单位"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入审批单位"
              v-decorator="[
                'auditUnit'
              ]"/>
          </a-form-item>
          <a-form-item
            label="审批日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <!-- <a-date-picker
              v-decorator="[
                'auditDate',
                {rules: [
                  { required: true, message: '请选择审批日期' },
                ]}
              ]"
              @change="onChange"
              style="width:100%;"/> -->
            <a-date-picker
              style="width:100%;"
              @change="onChange"
              :value="moment(round, 'YYYY-MM-DD')"/>
          </a-form-item>
          <a-form-item
            label="审批附件"
            :label-col="{ span:6 }"
            :wrapper-col="{ span: 12 }">
            <a-upload
              name="file"
              :action="action + 'upload'"
              :multiple="true"
              :fileList="fileListself"
              @preview="handlePreview"
              @change="handleChanges">
              <a-button><a-icon type="upload" />上传</a-button>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" >
              <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
            </a-modal>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail, saveAudit } from '@/api/project/info/index'
import mixins from '@/mixin/index'
import moment from 'moment'
const DetailListItem = DetailList.Item
const DetailListItemTwo = DetailList.ItemTwo
const DetailListItemOne = DetailList.ItemOne
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
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DetailList,
    DetailListItem,
    DetailListItemTwo,
    DetailListItemOne
  },
  data () {
    return {
      round: moment(new Date().toLocaleDateString()).format('YYYY-MM-DD'),
      detail: detail,
      fileListself: [],
      concatFile: [],
      apprDate: '',
      title: '',
      visible: false,
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    handleCancel () {
      this.visible = false
    },
    details () {
      this.visible = true
      this.title = '项目审批'
      this.$nextTick(() => {
        this.getDetails(this.ids)
      })
    },
    onChange (data, dateString) {
      this.round = dateString
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
      // this.concatFile = this.fileListself.concat(this.fileList)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            saveAudit({ id: this.ids, auditUnit: values.auditUnit, auditDate: this.round, auditFileKey: JSON.stringify(this.fileListself) }).then(res => {
              if (res.retCode !== 200) {
                this.$message.error(res.message)
                this.confirmLoading = false
              } else {
                this.$message.success(res.message)
                this.confirmLoading = false
              }
              this.visible = false
              this.fileListself = []
              this.$emit('getList')
            })
          })
        } else {
          this.confirmLoading = false
        }
      })
    }
  },
  mixins: [mixins.upload]
}
</script>
