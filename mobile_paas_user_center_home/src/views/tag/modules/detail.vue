<template>
  <div>
    <a-modal
      :title="title"
      :width="640"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel">
      <a-spin :spinning="confirmLoading">
        <detail-list class="detail-layout">
          <detail-list-item term="标题">{{ params.title }}</detail-list-item>
          <detail-list-item term="是否App推送">
            <template v-if="params.appPost === '0'" >是</template>
            <template v-if="params.appPost === '1'" >否</template>
          </detail-list-item>
          <detail-list-item term="是否短信推送">
            <template v-if="params.smsPost === '0'" >是</template>
            <template v-if="params.smsPost === '1'" >否</template>
          </detail-list-item>
          <detail-list-item term="是否自动发布">
            <template v-if="params.autoPost === '0'" >是</template>
            <template v-if="params.autoPost === '1'" >否</template>
          </detail-list-item>
          <detail-list-item term="推送类型">
            <template v-if="params.postType === '0'" >全部人</template>
            <template v-if="params.postType === '1'" >机构内全部人</template>
            <template v-if="params.postType === '2'" >指定人</template>
          </detail-list-item>
          <detail-list-item term="描述">{{ params.shortDesc }}</detail-list-item>
          <!-- <detail-list-item-one term="内容">{{ params.content }}</detail-list-item-one> -->
        </detail-list>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail } from '@/api/classify'
const DetailListItemOne = DetailList.ItemOne
const DetailListItem = DetailList.Item
export default {
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    DetailList,
    DetailListItemOne,
    DetailListItem
  },
  data () {
    return {
      title: '',
      visible: false,
      detail: detail,
      params: [],
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
      this.title = '政企应用系统详情'
      this.$nextTick(() => {
        this.getDetails(this.record.id)
      })
    },
    getDetails (id) {
      this.confirmLoading = true
      var url = this.$UPLOAD_URL.UPLOAD_URL + 'notice/detail/' + id
      detail(url).then(res => {
        if (res.data) {
          this.params = res.data
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>
<style>
  .detailLeft{margin-left:15px;}
</style>
