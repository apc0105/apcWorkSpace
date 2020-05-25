<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null">
      <a-spin :spinning="confirmLoading">
        <detail-list class="detail-layout">
          <detail-list-item-one term="项目名称">{{ this.proName }}</detail-list-item-one>
        </detail-list>
        <a-table :columns="columns" :dataSource="data" bordered :scroll="{x:1500}">
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handlelAdd(record)">添加</a>
              <a-divider type="vertical" />
              <a @click="handleDetails(record)">详细</a>
              <a-divider type="vertical" />
              <a @click="handleDelete(record)">删除</a>
            </template>
          </span>
        </a-table>
      </a-spin>
    </a-modal>
    <bids ref="bidsModals" :childId="childId" :proName="proName" @_modify="_modify" :ids="ids"/>
    <bids-detail ref="bidsDetailModal" :childId="childId"/>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { modify, proPackageDelete } from '@/api/project/info/index'
import bids from './bids'
import bidsDetail from './bidsDetail'
const DetailListItem = DetailList.Item
const DetailListItemOne = DetailList.ItemOne
export default {
  props: {
    ids: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      proName: '',
      visible: false,
      title: '',
      data: [],
      childId: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'number'
        }, {
          title: '分包名称',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        }, {
          dataIndex: 'budgetAmount',
          key: 'budgetAmount',
          title: ' 预算金额（万元）',
          scopedSlots: { customRender: 'budgetAmount' }
        }, {
          title: '招标代理机构',
          dataIndex: 'biddingUnit',
          key: 'biddingUnit'
        }, {
          dataIndex: 'biddingDate',
          key: 'biddingDate',
          title: '招标日期'
        }, {
          title: '供应商名称',
          dataIndex: 'supId',
          key: 'supId'
        }, {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 170,
          scopedSlots: { customRender: 'action' }
        }
      ],
      confirmLoading: false,
      maskClosable: false
    }
  },
  components: {
    DetailList,
    DetailListItem,
    DetailListItemOne,
    bids,
    bidsDetail
  },
  methods: {
    handleDetails (row) {
      this.$refs.bidsDetailModal.details()
      this.$emit('_getList')
      this.childId = row.id
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目招标'
        this._modify(this.ids)
      })
    },
    // 项目招标
    handlelAdd (row) {
      this.$refs.bidsModals.update()
      this.$emit('_getList')
      this.childId = row.id
    },
    _modify (id) {
      this.confirmLoading = true
      return new Promise((resolve, reject) => {
        modify({ id: id }).then(res => {
          this.proName = res.data.proName
          this.confirmLoading = false
          if (res.param.proPackage !== 'a') {
            this.data = res.param.proPackage
            this.data.forEach((res, index) => {
              res.number = index + 1
            })
          }
        })
      })
    },
    handleDelete (row) {
      proPackageDelete({ id: row.id }).then(res => {
        this._modify(this.ids)
      })
    },
    handleCancel () {
      this.visible = false
      this.$emit('noSelectChange')
    }
  }
}
</script>
