<template>
  <div>
    <a-table
      :loading="loading"
      @change="handleTableChange"
      :pagination="pagination"
      :scroll="{x:2400}"
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
          <a @click="handlelCard(record)" v-if="$permissionHandle('projectinfo:handlelCard')">资料卡</a>
          <a-divider type="vertical" />
          <a @click="handleDetail(record)" v-if="$permissionHandle('projectinfo:handleDetail')">详细</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)" v-if="$permissionHandle('projectinfo:handleEdit')">修改</a>
          <a-divider type="vertical" />
          <a @click="confirm(record.id)" v-if="$permissionHandle('projectinfo:confirm')">删除</a>
        </template>
      </span>
    </a-table>
    <edit ref="editModal" :rowss="rows" @getList="_getList" :treeData="treeData"/>
    <detail ref="detailModal" :rowss="rows" @getList="_getList"/>
    <data-card ref="cardModal" :rowss="cardId" @getList="_getList"/>
  </div>
</template>
<script>
import edit from './edit'
import detail from '@/views/project/modules/details'
import DataCard from '@/module/DataCard'
// import mixins from '@/mixin/index'
const columns = [
  {
    dataIndex: 'proName',
    key: 'proName',
    title: '项目名称',
    fixed: 'left',
    width: 200,
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
    width: 300
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
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    edit,
    DataCard,
    detail
  },
  props: {
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
    treeData: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      cardId: '',
      rows: '',
      columns,
      deleteList: []
    }
  },
  methods: {
    handleDetail (row) {
      this.rows = row.id
      this.$refs.detailModal.details()
      this.$emit('_getList')
    },
    handlelCard (row) {
      this.cardId = row.id
      this.$refs.cardModal.open()
      this.$emit('_getList')
    },
    handleEdit (row) {
      this.rows = row.id
      this.$refs.editModal.update()
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
