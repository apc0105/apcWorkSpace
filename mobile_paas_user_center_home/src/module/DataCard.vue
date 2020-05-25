<template>
  <div>
    <a-modal
      :title="title"
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel">
      <div style="color:#000;" id="printMes">
        <h2 style="text-align:center;font-size:24px;font-weight:600;padding:20px 0 30px;">招标项目资料卡片</h2>
        <table class="bids">
          <tr>
            <th width="110">项目名称</th>
            <td colspan="5">{{ data.proName }}</td>
          </tr>
          <tr>
            <th>承办部门</th>
            <td>就回家考试的分数的开发商打扫打扫打扫打扫</td>
            <th width="100">总台决议日期</th>
            <td>{{ data.apprWay }}{{ data.apprDate }}</td>
            <th width="100">技术论证日期</th>
            <td width="100"><template v-if="data.telDate">{{ data.telDate }}</template></td>
          </tr>
          <tr>
            <th :rowspan="proPackage.length + 1">预算及分包</th>
            <td colspan="5" v-if="proPackage.length ===0"></td>
          </tr>
          <template v-if="proPackage.length !==0" v-for="(item,index) in proPackage" >
            <tr :key="index">
              <!-- 第{{ index | toChies }}包 ： -->
              <td colspan="5">{{ item.name }}　　　　　　　　　{{ item.budgetAmount }}万元</td>
            </tr>
          </template>
          <tr>
            <th>采购形式</th>
            <td colspan="2">
              <!-- {{ buyForm }} -->
              <template v-for="(item,index) in proPackage">
                <p :key="index" v-if="item.buyForm !== ''" style="margin-bottom:auto">{{ item.buyForm }}</p>
              </template>
            </td>
            <th>采购方式</th>
            <td colspan="2">
              <template v-for="(item,index) in proPackage">
                <p :key="index" v-if="item.buyWay !== ''" style="margin-bottom:auto">{{ item.buyWay }}</p>
              </template>
            </td>
          </tr>
          <tr>
            <th>招标代理</th>
            <td colspan="2">{{ data.biddingUnit }}</td>
            <th>招标时间</th>
            <td colspan="2"><p style="margin-bottom:auto">{{ data.biddingDate }}</p><p style="margin-bottom:auto">{{ data.biddingDateHis }}</p></td>
          </tr>

          <tr>
            <th :rowspan="proContract.length +1">中标供应商</th>
            <td v-if="proContract.length === 0" colspan="5"></td>
          </tr>
          <!-- 第{{ index | toChies }}包 ： -->
          <template v-if="proContract.length !== 0" v-for="(item,index) in proContract">
            <tr :key="index">
              <td :key="index" colspan="5">{{ item.supId }}</td>
            </tr>
          </template>
          <tr>
            <th :rowspan="proContract.length + 1">合同编号及金额</th>
            <td v-if="proContract.length === 0" colspan="5"></td>
          </tr>
          <template v-for="(item,index) in proContract" v-if="proContract.length !== 0" >
            <tr :key="index">
              <td colspan="2">{{ item.conCode }}：{{ item.comAmount }}万元</td>
              <template v-if="index === 0">
                <th :rowspan="proContract.length">验收日期</th>
                <td colspan="2" :rowspan="proContract.length">
                  <!-- {{ proContract[0].checkDate }} -->
                  <template v-for="(item,index) in proContract">
                    <p :key="index" v-if="item.checkDate !== ''" style="margin-bottom:auto">{{ item.checkDate }}</p>
                  </template>
                </td>
              </template>
            </tr>
          </template>
          <!-- <tr>
            <th>付款凭证号及金额</th>
            <td colspan="6"></td>
          </tr> -->
        </table>
      </div>
      <a-row style="margin-top:10px;">
        <a-col :span="3" style="float:right;">
          <a-button type="primary" v-print="'#printMes'">打印</a-button>
        </a-col>
        <a-col :span="3" style="float:right;">
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import { details } from '@/api/project/info/index'
export default {
  props: {
    printData: {
      type: Object,
      default: () => {}
    },
    rowss: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.data = {}
        this.proPackage = []
        this.proContract = []
      }
    }
  },
  data () {
    return {
      title: '',
      visible: false,
      data: {},
      proPackage: [],
      proContract: [],
      confirmLoading: false
    }
  },
  filters: {
    toChies (val) {
      let value = ''
      const china = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      china.forEach((res, index) => {
        if (val + 1 === index) {
          value = res
        }
      })
      return value
    }
  },
  methods: {
    _detail (id) {
      return new Promise((resolve, reject) => {
        details({ id: id }).then(res => {
          this.data = res.data
          if (res.param.proPackage !== 'a') {
            this.proPackage = res.param.proPackage
            // this.buyForm = res.param.proPackage[0].buyForm
            // this.buyWay = res.param.proPackage[0].buyWay
          }
          if (res.param.proContract !== 'a') { this.proContract = res.param.proContract }
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    open () {
      this.title = '招标项目资料卡片'
      this.visible = true
      this.$nextTick(() => {
        this._detail(this.rowss)
      })
    }
  }
}
</script>
<style>
  .bids th, .bids td{border:1px solid #000;padding:10px 0;}
  .bids th{text-align: center}
  .bids td{text-indent: 10px;}
  .bids{margin-top:10px;}
  .centerT th, .centerT td{text-align: center}
</style>
