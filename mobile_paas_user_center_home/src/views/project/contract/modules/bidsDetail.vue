<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="740"
      :confirmLoading="confirmLoading"
      :visible="visibles"
      :footer="null"
      @cancel="handleCancel">
      <a-spin :spinning="confirmLoading">
        <detail-list class="detail-layout">
          <detail-list-item term="项目名称">{{ params.proId }}</detail-list-item>
          <detail-list-item term="分包名称">{{ params.name }}</detail-list-item>
          <detail-list-item term="预算金额（万元）">{{ params.budgetAmount }}</detail-list-item>
          <detail-list-item term="采购形式">{{ params.buyForm }}</detail-list-item>
          <detail-list-item term="采购方式">{{ params.buyWay }}</detail-list-item>
          <detail-list-item term="招标代理机构">{{ params.biddingUnit }}</detail-list-item>
          <detail-list-item term="招标日期">{{ params.biddingDate }}</detail-list-item>
          <detail-list-item term="评标地点">{{ params.biddingPlace }}</detail-list-item>
          <detail-list-item term="供应商名称">{{ params.supId }}</detail-list-item>
          <detail-list-item term="验收日期">{{ params.checkDate }}</detail-list-item>
          <detail-list-item term="验收结论">{{ params.checkResult }}</detail-list-item>
          <detail-list-item term="付款金额（万元）">{{ params.payAmount }}</detail-list-item>
          <detail-list-item term="待付款金额（万元）">{{ params.wPayAmount }}</detail-list-item>
          <detail-list-item term="待付款比例">{{ params.wPayPid }}</detail-list-item>
          <detail-list-item term="待付款时间">{{ params.wPayDate }}</detail-list-item>
          <detail-list-item term="是否转固定资产">{{ params.isAssets }}</detail-list-item>
          <detail-list-item term="专家抽取回避部门">{{ params.avoidDepId }}</detail-list-item>
          <detail-list-item term="抽取条件">{{ params.extrCondition }}</detail-list-item>
          <detail-list-item term="fileKey">{{ params.budgetAmount }}</detail-list-item>
        </detail-list>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { view } from '@/api/project/info/index'
const DetailListItem = DetailList.Item
export default {
  props: {
    childId: {
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
      params: {},
      maskClosable: false,
      title: '',
      visibles: false,
      confirmLoading: false
    }
  },
  methods: {
    handleCancel () {
      this.visibles = false
    },
    details () {
      this.visibles = true
      this.title = '项目招标详细'
      this.$nextTick(() => {
        this._view(this.childId)
      })
    },
    _view (id) {
      this.confirmLoading = true
      return new Promise((resolve, reject) => {
        view({ id: id }).then(res => {
          this.params = res.data
          this.confirmLoading = false
        })
      })
    }
  }

}
</script>
