<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="1000"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel">
      <detail-list class="detail-layout">
        <detail-list-item-one term="项目名称">{{ this.proName }}</detail-list-item-one>
      </detail-list>
      <a-table
        :scroll="{x:900}"
        :columns="columns"
        :dataSource="data">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleCard(record)">付款</a>
          </template>
        </span>
      </a-table>
    </a-modal>
    <pact
      ref="pact"
      :packageId="packageId"
      :proName="proName"
      :conCode="conCode"
      :childIds="childIds"
      :comAmount="comAmount"
      :childName="childName"
      @_getProContractList="_getProContractList"
      :ids="ids"/>
  </div>
</template>
<script>
import { getProContractList } from '@/api/project/info/index'
import pact from './pact'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
const DetailListItemOne = DetailList.ItemOne
export default {
  props: {
    ids: {
      type: String,
      default: ''
    },
    childIds: {
      type: String,
      default: ''
    },
    proName: {
      type: String,
      default: ''
    },
    childName: {
      type: String,
      default: ''
    }
  },
  components: {
    pact,
    DetailList,
    DetailListItem,
    DetailListItemOne
  },
  data () {
    return {
      maskClosable: false,
      title: '',
      conCode: '',
      confirmLoading: false,
      visible: false,
      packageId: '',
      comAmount: '',
      columns: [
        {
          dataIndex: 'number',
          title: '序号'
        }, {
          dataIndex: 'conCode',
          key: 'conCode',
          title: '合同编号',
          scopedSlots: { customRender: 'conCode' }
        }, {
          dataIndex: 'comAmount',
          key: 'comAmount',
          title: '合同金额（万元）',
          scopedSlots: { customRender: 'comAmount' }
        }, {
          dataIndex: 'payTotal',
          key: 'payTotal',
          title: '付款合计（万元）',
          scopedSlots: { customRender: 'payTotal' }
        }, {
          dataIndex: 'wPayAmount',
          key: 'wPayAmount',
          title: '待付款金额（万元）',
          scopedSlots: { customRender: 'wPayAmount' }
        }, {
          dataIndex: 'wPayPid',
          key: 'wPayPid',
          title: '待付款比例',
          scopedSlots: { customRender: 'wPayPid' }
        }, {
          dataIndex: 'wPayDate',
          key: 'wPayDate',
          title: '待付款时间',
          scopedSlots: { customRender: 'wPayDate' }
        }, {
          title: '操作',
          key: 'action',
          width: 80,
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: []
    }
  },
  methods: {
    _getProContractList () {
      return new Promise((resolve, reject) => {
        getProContractList({ packageId: this.childIds, pageSize: 100, pageNo: 0 }).then(res => {
          this.data = res.data.content
          this.data.forEach((res, index) => {
            res.number = index + 1
          })
        })
      })
    },
    handleCard (row) {
      this.comAmount = row.comAmount
      this.$refs.pact.update()
      this.packageId = row.id
      this.conCode = row.conCode
    },
    open () {
      this.title = '合同'
      this.visible = true
      this.$nextTick(() => {
        this._getProContractList()
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
