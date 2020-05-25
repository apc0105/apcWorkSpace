<template>
  <div>
    <a-table
      :loading="loading"
      @change="handleTableChange"
      :pagination="pagination"
      :scroll="{x:2700}"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="data">
      <span slot="proType" slot-scope="text, record">
        <template v-if="record.proType === '1'">集中采购项目</template>
        <template v-if="record.proType === '2'">自行采购项目</template>
        <template v-if="record.proType === '3'">其他</template>
      </span>
      <span slot="proState" slot-scope="text, record">
        <template v-if="record.proState === '0'">待立项</template>
        <template v-if="record.proState === '1'">立项</template>
        <template v-if="record.proState === '2'">招标</template>
        <template v-if="record.proState === '3'">验收</template>
        <template v-if="record.proState === '4'">付款</template>
        <template v-if="record.proState === '5'">完成</template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handlelCard(record)" v-if="$permissionHandle('projectcontract:handlelCard')">资料卡</a>
          <!-- <a-divider type="vertical" />
          <a @click="handleDetails(record)">审批</a> -->
          <a-divider type="vertical" />
          <a @click="handleDetail(record)" v-if="$permissionHandle('projectcontract:handleDetail')">详细</a>
          <!-- <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-if="$permissionHandle('dep:handleEdit')">修改</a>
          <a-divider type="vertical" />
          <a @click="confirm(record.id)" v-if="$permissionHandle('dep:confirm')">删除</a> -->
        </template>
      </span>
    </a-table>
    <detail ref="detailModal" :rowss="rows" @getList="_getList" :treeData="treeData"/>
    <data-card ref="cardModal" :rowss="cardId" @getList="_getList"/>
  </div>
</template>
<script>
import detail from '@/views/project/modules/details'
import DataCard from '@/module/DataCard'
const columns = [
  {
    dataIndex: 'proName',
    key: 'proName',
    title: '项目名称',
    scopedSlots: { customRender: 'proName' }
  }, {
    title: '项目状态',
    dataIndex: 'proState',
    key: 'proState',
    scopedSlots: { customRender: 'proState' }
  }, {
    dataIndex: 'apprDate',
    key: 'apprDate',
    title: '会议日期',
    scopedSlots: { customRender: 'apprDate' }
  }, {
    title: '承办部门',
    dataIndex: 'depId',
    key: 'depId'
  }, {
    dataIndex: 'proContent',
    key: 'proContent',
    title: '项目概述',
    width: 500
  }, {
    title: '总预算（万元）',
    dataIndex: 'totalFound',
    key: 'totalFound'
  }, {
    title: '财政资金（万元）',
    key: 'financialFound',
    dataIndex: 'financialFound'
  }, {
    title: '审批单位',
    dataIndex: 'auditUnit',
    key: 'auditUnit'
  }, {
    title: '审批日期',
    key: 'auditDate',
    dataIndex: 'auditDate'
  }, {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    detail,
    DataCard
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    selectedRowKeys: {
      type: Array,
      default: () => []
    },
    // columns: {
    //   type: Array,
    //   default: () => []
    // },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      rows: '',
      columns,
      deleteList: [],
      cardId: ''
    }
  },
  methods: {
    handlelCard (row) {
      this.cardId = row.id
      this.$refs.cardModal.open()
      this.$emit('_getList')
    },
    handleDetail (row) {
      this.rows = row.id
      this.$refs.detailModal.details()
      this.$emit('_getList')
    },
    confirm (id) {
      this.$emit('confirm', id)
    },
    _getList () {
      this.$emit('_getList')
    },
    handleTableChange (pagination, filters, sorter) {
      this.$emit('handleTableChange', pagination, filters, sorter)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.$emit('onSelectChange', selectedRowKeys, selectedRows)
    }
  }
}
</script>
