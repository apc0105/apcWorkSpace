<template>
  <div class="tableBox"> 
    <!-- <p v-if=" approvalList && approvalList.content && !approvalList.content.length" class="noData">暂无数据<svg-icon icon-class="cry" /></p> -->
    <el-table
      :header-cell-style="{'background-color':'#fafafa'}"
      :cell-style="cellStyle"
      @row-click="rowClick"
      :data="approvalList.content"
      style="width: 100%"
      class="tableBox"      
      >
      <el-table-column
        prop="applyName"
        label="名称"
        width="350"
        >
      </el-table-column>
      <el-table-column
        prop="runtimeNodeName"
        label="所处环节"
        >
      </el-table-column>
      <el-table-column
        prop="creatorName"
        label="申请人">
      </el-table-column>
      <el-table-column
        label="办理时间">
        <template slot-scope="scope">
          <span>{{scope.row.taskEndTime| formatTime(scope.row.taskEndTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="100"
        prop="processStateName"
        label="状态">
        <!-- <template slot-scope="scope">
          <el-tag
          effect="dark"
          :type="scope.row.taskState === '1' ? 'danger' : 'primary'"
          disable-transitions>{{scope.row.taskState=== '1'?'办理中':'已办结'}}</el-tag>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from 'moment'


export default {
  name: 'ProcessCenter',
  filters: {
    formatNum(val) {
      return Number(val)
    },
    formatTime(val) {
      return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    approvalList: {
      type: Object,
      default: () => {}
    }
  },
  // data() {
  //   return {
  //     activeName: 'getTodoTask',
  //     totalElements: 1,
  //     pageNumber: 0,
  //     pageSize: 10,
  //     approvalList:[],
  //   }
  // },
  created() {

  },
  methods: {
    rowClick(row, column, event) {
      this.$router.push({
        path: `/processCenter/form/view/${row.applyId}`,
        query: { url: 'getApply' }//, processId: row.processId
      })
      console.log(row, column, event)
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        'cursor': 'pointer',
        'color': '#8f8f8f ',
        'height': '50px !important'
      }
    }
  }

}
</script>



