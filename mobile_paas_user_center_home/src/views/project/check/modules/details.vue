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
        <detail-list-item-two term="会议日期">{{ params.meetingDate }}</detail-list-item-two>
        <detail-list-item-two term="承办部门">{{ params.depId }}</detail-list-item-two>
        <detail-list-item-two term="立项方式">{{ params.apprWay }}</detail-list-item-two>
        <detail-list-item-two term="立项日期">{{ params.apprDate }}</detail-list-item-two>
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
        <detail-list-item-two term="创建时间">{{ params.createTime }}</detail-list-item-two>
        <detail-list-item-one term="备注">{{ params.remark }}</detail-list-item-one>
        <detail-list-item-one term="附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            @preview="handlePreview"
            class="closeDis"
            :fileList="fileList"
            @change="handleChange">
          </a-upload>
        </detail-list-item-one>
      </detail-list>
      <input :value="rowss" type="hidden" ref="hiddenInput">
      <a-spin :spinning="confirmLoading">
        <!-- <a-form :form="form">
          <a-form-item
            label="审批单位"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-tree-select
              style="width: 100%"
              :treeData="treeData"
              placeholder="请选择审批单位"
              v-decorator="[
                'auditUnit',
                {rules: [
                  { required: true, message: '请输入审批单位' },
                ]}
              ]">
            </a-tree-select>
          </a-form-item>
          <a-form-item
            label="审批日期"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
            <a-date-picker
              v-decorator="[
                'auditDate',
                {rules: [
                  { required: true, message: '请选择审批日期' },
                ]}
              ]"
              @change="onChange"
              style="width:100%;"/>
          </a-form-item>
        </a-form> -->
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail, saveAudit } from '@/api/project/info/index'
import mixins from '@/mixin/index'
const DetailListItem = DetailList.Item
const DetailListItemTwo = DetailList.ItemTwo
const DetailListItemOne = DetailList.ItemOne
export default {
  props: {
    rowss: {
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
      apprDate: '',
      title: '',
      visible: false,
      detail: detail,
      params: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    details () {
      this.visible = true
      this.title = '项目审批'
      this.$nextTick(() => {
        this.getDetails(this.$refs.hiddenInput.value)
      })
    },
    onChange (date, dateString) {
      this.apprDate = dateString
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            saveAudit({ id: this.rowss, auditUnit: values.auditUnit, auditDate: this.apprDate }).then(res => {
              if (res.retCode !== 200) {
                this.$message.error(res.message)
                this.confirmLoading = false
              } else {
                this.$message.success(res.message)
                this.confirmLoading = false
              }
              this.visible = false
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
