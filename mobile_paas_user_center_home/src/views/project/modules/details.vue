<template>
  <div>
    <a-modal
      :title="title"
      :width="1040"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel">
      <div class="title">基本信息</div>
      <detail-list class="detail-layout">
        <detail-list-item term="项目名称">{{ params.proName }}</detail-list-item>
        <detail-list-item term="项目类型">
          <template v-if="params.proType==='1'">集中采购项目</template>
          <template v-if="params.proType==='2'">自行采购项目</template>
        </detail-list-item>
        <detail-list-item term="会议日期">{{ params.apprDate }}</detail-list-item>
        <detail-list-item term="承办部门">{{ params.depId }}</detail-list-item>
        <detail-list-item term="立项方式">{{ params.apprWay }}</detail-list-item>
        <!-- <detail-list-item term="立项日期">{{ params.apprDate }}</detail-list-item> -->
        <detail-list-item term="技术论证日期">{{ params.telDate }}</detail-list-item>
        <detail-list-item term="论证部门">{{ params.telDep }}</detail-list-item>
        <detail-list-item term="总预算(万元)">{{ params.totalFound }}</detail-list-item>
        <detail-list-item term="财政资金(万元)">{{ params.financialFound }}</detail-list-item>
        <detail-list-item term="审批单位">{{ params.auditUnit }}</detail-list-item>
        <detail-list-item term="审批日期">{{ params.auditDate }}</detail-list-item>
        <detail-list-item term="项目状态">
          <template v-if="params.proState==='1'">立项</template>
          <template v-if="params.proState==='2'">招标</template>
          <template v-if="params.proState==='3'">验收</template>
          <template v-if="params.proState==='4'">付款</template>
          <template v-if="params.proState==='5'">完成</template>
        </detail-list-item>
        <detail-list-item term="招标代理机构">{{ params.biddingUnit }}</detail-list-item>
        <detail-list-item term="招标日期">{{ params.biddingDate }}</detail-list-item>
        <detail-list-item term="历史招标日期">{{ params.biddingDateHis }}</detail-list-item>
        <detail-list-item-one term="项目概述">{{ params.proContent }}</detail-list-item-one>
        <detail-list-item-one term="论证结论">{{ params.telConclus }}</detail-list-item-one>
        <detail-list-item-one term="备注">{{ params.remark }}</detail-list-item-one>
        <detail-list-item-two term="立项附件">
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
        <detail-list-item-two term="招标附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            @preview="handlePreview"
            class="closeDis"
            :fileList="zbfileList">
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-two>
        <detail-list-item-two term="审批附件">
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            class="closeDis"
            :fileList="fileListself"
            @preview="handlePreview"
            @change="handleChanges">
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" >
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-two>
      </detail-list>
      <input :value="rowss" type="hidden" ref="hiddenInput">
      <a-divider style="margin-bottom: 32px"/>
      <div class="title">分包列表</div>
      <a-table
        style="margin-bottom: 24px"
        :columns="subPackageColumns"
        :scroll="{x:900}"
        :dataSource="subPackageData">
      </a-table>
      <a-divider style="margin-bottom: 32px"/>
      <div class="title">合同列表</div>
      <a-table
        style="margin-bottom: 24px"
        :scroll="{x:2200}"
        :columns="contractColumns"
        :dataSource="contractData">
        <template slot="conCode" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.conCode }}</p>
          </template>
        </template>
        <template slot="conDate" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.conDate }}</p>
          </template>
        </template>
        <template slot="comAmount" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.comAmount }}</p>
          </template>
        </template>
        <template slot="payTotal" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.payTotal }}</p>
          </template>
        </template>

        <template slot="sub" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.sub }}</p>
          </template>
        </template>
        <template slot="checkDate" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.checkDate }}</p>
          </template>
        </template>
        <template slot="checkResult" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.checkResult }}</p>
          </template>
        </template>
        <template slot="payAmount" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.payAmount }}</p>
          </template>
        </template>
        <template slot="wPayAmount" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.wPayAmount }}</p>
          </template>
        </template>
        <template slot="wPayPid" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.wPayPid }}</p>
          </template>
        </template>
        <template slot="payWay" slot-scope="text, record">
          <template v-for="(item,index) in record.contract">
            <p :key="index" style="margin-bottom:0;">{{ item.payWay }}</p>
          </template>
        </template>
      </a-table>
      <detail-list class="detail-layout">
        <detail-list-item-one term="合同附件"class="display-inline">
          <!-- @change="handleChanges" -->
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            @preview="handlePreview"
            class="closeDis"
            :fileList="htfileList"
          >
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-one>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <div class="title">付款列表</div>
      <a-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="paymentColumns"
        :dataSource="paymentData">
        <template slot="payNum" slot-scope="text, record">
          <template v-for="(item,index) in record.contractPay">
            <p :key="index" style="margin-bottom:0;">{{ item.payNum }}</p>
          </template>
        </template>
        <template slot="payAmount" slot-scope="text, record">
          <template v-for="(item,index) in record.contractPay">
            <p :key="index" style="margin-bottom:0;">{{ item.payAmount }}</p>
          </template>
        </template>
      </a-table>
      <detail-list class="detail-layout">
        <detail-list-item-one term="验收附件"class="display-inline">
          <!-- @change="handleChanges" -->
          <a-upload
            :action="action + 'upload'"
            :multiple="true"
            @preview="handlePreview"
            class="closeDis"
            :fileList="fkfileList"
          >
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancels" :width="1366">
            <img v-lazy="previewImage" alt="example" style="max-width:100%;margin:0 auto;position: relative;left: 50%;transform: translateX(-50%)"/>
          </a-modal>
        </detail-list-item-one>
      </detail-list>
    </a-modal>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { detail } from '@/api/project/info/index'
import mixins from '@/mixin/index'
import { STable } from '@/components'
const DetailListItem = DetailList.Item
const DetailListItemOne = DetailList.ItemOne
const DetailListItemTwo = DetailList.ItemTwo
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
    DetailListItemOne,
    DetailListItemTwo,
    STable
  },
  data () {
    return {
      zbfileList: [],
      htfileList: [],
      fkfileList: [],
      subPackageColumns: [{
        title: '序号',
        dataIndex: 'number',
        fixed: 'left',
        width: 100
      }, {
        title: '分包名称',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 200,
        scopedSlots: { customRender: 'name' }
      }, {
        title: '预算金额（万元）',
        width: 150,
        dataIndex: 'budgetAmount',
        key: 'budgetAmount'
      },
      {
        title: '采购形式',
        dataIndex: 'buyForm',
        key: 'buyForm'
      }, {
        title: '采购方式',
        dataIndex: 'buyWay',
        key: 'buyWay'
      },
      {
        title: '评标地点',
        dataIndex: 'biddingPlace',
        key: 'biddingPlace'
      }
      // {
      //   title: '待付款时间',
      //   dataIndex: 'wPayDate',
      //   key: 'wPayDate'
      // }, {
      //   title: '是否转固定资产',
      //   dataIndex: 'isAssets',
      //   key: 'isAssets'
      // }
      ],
      subPackageData: [],
      contractColumns: [
        {
          title: '序号',
          dataIndex: 'number',
          width: 100,
          fixed: 'left'
        }, {
          title: '分包名称',
          dataIndex: 'packageId',
          key: 'packageId',
          width: 200,
          fixed: 'left',
          scopedSlots: { customRender: 'packageId' }
        }, {
          title: '合同编号',
          dataIndex: 'conCode',
          key: 'conCode',
          scopedSlots: { customRender: 'conCode' }
        }, {
          title: '合同签订时间',
          dataIndex: 'conDate',
          key: 'conDate',
          scopedSlots: { customRender: 'conDate' }
        }, {
          title: '合同金额（万元）',
          dataIndex: 'comAmount',
          key: 'comAmount',
          scopedSlots: { customRender: 'comAmount' }
        }, {
          title: '付款合计（万元）',
          dataIndex: 'payTotal',
          key: 'payTotal',
          scopedSlots: { customRender: 'payTotal' }
        }, {
          title: '待付款金额（万元）',
          dataIndex: 'wPayAmount',
          key: 'wPayAmount',
          scopedSlots: { customRender: 'wPayAmount' }
        }, {
          title: '待付款比例',
          dataIndex: 'wPayPid',
          key: 'wPayPid',
          scopedSlots: { customRender: 'wPayPid' }
        }, {
          title: '供应商',
          dataIndex: 'sub',
          key: 'sub',
          scopedSlots: { customRender: 'sub' }
        }, {
          title: '验收日期',
          dataIndex: 'checkDate',
          key: 'checkDate',
          scopedSlots: { customRender: 'checkDate' }
        }, {
          title: '验收结论',
          dataIndex: 'checkResult',
          key: 'checkResult',
          scopedSlots: { customRender: 'checkResult' }
        }, {
          title: '付款方式',
          dataIndex: 'payWay',
          key: 'payWay',
          scopedSlots: { customRender: 'payWay' }
        }],
      contractData: [],
      paymentColumns: [
        {
          title: '序号',
          dataIndex: 'number'
        },
        {
          title: '合同编号',
          dataIndex: 'conCode',
          key: 'conCode'
        }, {
          title: '付款次数',
          dataIndex: 'payNum',
          key: 'payNum',
          scopedSlots: { customRender: 'payNum' }
        }, {
          title: '付款金额（万元）',
          dataIndex: 'payAmount',
          key: 'payAmount',
          scopedSlots: { customRender: 'payAmount' }
        }
      ],
      paymentData: [],
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
    handleChanges (info) {
      let fileLists = [...info.fileList]
      fileLists = fileLists.map(file => {
        if (file.response) {
          file.url = this.action + 'download/' + file.response.data[0].id
        }
        return file
      })
      this.fileLists = fileLists
    },
    details () {
      this.visible = true
      this.title = '项目详细'
      this.$nextTick(() => {
        this.getDetails(this.$refs.hiddenInput.value)
      })
    }
  },
  mixins: [mixins.upload]
}
</script>
<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }

</style>
