<template>
  <div>
    <a-modal
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
        <detail-list-item term="资质情况">{{ params.aptitude }}</detail-list-item>
        <detail-list-item term="附件"></detail-list-item>
      </detail-list>
      <input :value="rowss" type="hidden" ref="hiddenInput">
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail } from '@/api/organ/info/index'
const DetailListItem = DetailList.Item
export default {
  props: {
    rowss: {
      type: String,
      default: ''
    }
  },
  components: {
    DetailList,
    DetailListItem
  },
  data () {
    return {
      title: '',
      visible: false,
      params: {}
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
    },
    getDetails (id) {
      return new Promise((resolve, reject) => {
        detail({ id: id }).then(res => {
          this.params = res.data
        })
      })
    }
  }
}
</script>
