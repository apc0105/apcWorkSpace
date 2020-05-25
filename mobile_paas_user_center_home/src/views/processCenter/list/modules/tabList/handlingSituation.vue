<template>
  <div class="tableBox"> 
    <!-- <p v-if=" approvalList && approvalList.content && !approvalList.content.length" class="noData">暂无数据<svg-icon icon-class="cry" /></p> -->
    <el-table
      :header-cell-style="{'background-color':'#fafafa'}"
      :cell-style="cellStyle"
      :data="data"
      style="width: 100%"
      class="tableBox"      
      >
      <el-table-column
        prop="runtimeNodeName"
        label="环节"
        >
      </el-table-column>
      <el-table-column
        prop="assignName"
        label="办理人"
        >
      </el-table-column>
      <el-table-column
        prop="taskTypeName"
        label="操作类型">
      </el-table-column>
      <el-table-column
        prop="stateName"
        label="办理情况">
      </el-table-column>
      <el-table-column
        label="任务到达时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime| formatTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="办理时间">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{scope.row.endTime| formatTime(scope.row.endTime)}}</span>
          <span v-else >暂无</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="办理时长">
        <template slot-scope="scope">
          <span  v-if="scope.row.endTime">{{scope.row.createTime,scope.row.endTime| formatTimeReduce()}}</span>
          <span v-else >暂无</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
function formatDuring(mss) {
  var days = mss < 86400000 ? 0 : parseInt(mss / (1000 * 60 * 60 * 24))
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = parseInt((mss % (1000 * 60)) / 1000)
  return days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 '
}
import moment from 'moment'

export default {
  name: 'ProcessCenter',
  filters: {
    formatTimeReduce(startVal, endVal) {
      const reduce = Number(endVal) - Number(startVal)
      return formatDuring(reduce)
    },
    formatTime(val) {
      return moment(Number(val)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  created() {

  },
  methods: {
    // rowClick(row, column, event) {
    //   this.$router.push({
    //     path: `/processCenter/creatApproval/${row.applyId}`,
    //     query: { url: 'getApply', processId: row.processId }
    //   })
    //   console.log(row, column, event)
    // },
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



