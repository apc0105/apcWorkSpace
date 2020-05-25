<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="640"
      :visible="visible"
      @cancel="handleCancel">
      <detail-list class="detail-layout">
        <detail-list-item term="名称">{{ params.name }}</detail-list-item>
        <detail-list-item term="类型">{{ params.type }}</detail-list-item>
        <detail-list-item term="经营范围">{{ params.range }}</detail-list-item>
        <detail-list-item term="入围时间">{{ params.idate }}</detail-list-item>
        <detail-list-item term="联系人">{{ params.linkMan }}</detail-list-item>
        <detail-list-item term="联系电话">{{ params.linkTel }}</detail-list-item>
        <detail-list-item-one term="资质情况">{{ params.aptitude }}</detail-list-item-one>
        <detail-list-item-one term="附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            class="closeDis"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange">
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-one>
      </detail-list>
      <input :value="rowss" type="hidden" ref="hiddenInput">
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail } from '@/api/organ/info/index'
import mixins from '@/mixin/index'
const DetailListItem = DetailList.Item
const DetailListItemOne = DetailList.ItemOne
export default {
  props: {
    rowss: {
      type: String,
      default: ''
    }
  },
  components: {
    DetailList,
    DetailListItem,
    DetailListItemOne
  },
  data () {
    return {
      title: '',
      detail: detail,
      visible: false,
      params: {},
      maskClosable: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    details () {
      this.visible = true
      this.title = '供应商信息管理详情'
      this.$nextTick(() => {
        this.getDetails(this.$refs.hiddenInput.value)
      })
    }
  },
  mixins: [mixins.upload]
}
</script>
