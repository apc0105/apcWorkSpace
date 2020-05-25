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
        <a-table :columns="columns" :dataSource="data" bordered >
          <template slot="action" slot-scope="text, record">
            <a @click="handlelAdd(record)">编辑</a>
          </template>
          <template slot="conCode" slot-scope="text, record">
            <template v-for="item in record.child">
              <p :key="item.id">{{ item.conCode }}</p>
            </template>
          </template>
          <template slot="comAmount" slot-scope="text, record">
            <template v-for="item in record.child">
              <p :key="item.id">{{ item.comAmount }}</p>
            </template>
          </template>
        </a-table>
      </a-spin>
    </a-modal>
    <pact
      ref="bidsModals"
      :childIds="childIds"
      :proName="proName"
      :parentId="parentId"
      :childName="childName"
      @_modify="_modify"
      :ids="ids"/>
    <pact-detail ref="pactDetailModal" :childIds="childIds" :proName="proName" :childName="childName"/>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import { getPackageAndContract, proContractDelete } from '@/api/project/info/index'
import pact from './pact'
import pactDetail from './pactDetail'
const DetailListItem = DetailList.Item
const DetailListItemOne = DetailList.ItemOne
export default {
  props: {
    ids: {
      type: String,
      default: ''
    },
    proName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      title: '',
      childName: '',
      data: [],
      childId: '',
      parentId: '',
      childIds: '',
      maskClosable: false,
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
          title: '合同编号',
          dataIndex: 'conCode',
          key: 'conCode',
          scopedSlots: { customRender: 'conCode' }
        }, {
          dataIndex: 'comAmount',
          key: 'comAmount',
          title: '合同金额（万元）',
          scopedSlots: { customRender: 'comAmount' }
        }, {
          title: '操作',
          key: 'action',
          width: 80,
          scopedSlots: { customRender: 'action' }
        }
      ],
      confirmLoading: false
    }
  },
  components: {
    DetailList,
    DetailListItem,
    DetailListItemOne,
    pact,
    pactDetail
  },
  methods: {
    handleDetails (row) {
      this.$refs.pactDetailModal.open()
      this.childIds = row.id
      this.childName = row.name
      console.log(row.id)
    },
    update () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '项目合同'
        this._modify(this.ids)
      })
    },
    // 项目招标
    handlelAdd (row) {
      this.childIds = row.id
      this.childName = row.name
      this.parentId = this.ids
      this.$refs.bidsModals.update()
      this.$emit('_getList')
    },
    _modify (id) {
      this.confirmLoading = true
      return new Promise((resolve, reject) => {
        getPackageAndContract({ proId: id }).then(res => {
          this.confirmLoading = false
          this.data = res.data
          this.data.forEach((res, index) => {
            res.number = index + 1
            if (res.child.length === 0) {
              delete res.child
            } else {
              res.child.forEach(rep => {
                rep.child = 'children'
              })
            }
          })
          this.data = [...this.data]
        })
      })
    },
    handleDelete (row) {
      proContractDelete({ id: row.id }).then(res => {
        this._modify(this.ids)
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
