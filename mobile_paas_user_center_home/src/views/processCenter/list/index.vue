<template>
  <div class="dashboard-editor-container"> 
    <div class="main" style="background:#fff;padding:16px 16px;margin-bottom:12px;min-height:calc(100vh - 90px)"  :gutter="10">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="flex-grow-1">
              <div class="flex-grow-1">
                <router-link to="/processCenter/list/add">
                <el-button icon="el-icon-plus" type="primary">
                  {{i18n('operation.flow.approval.add')}}
                </el-button>
                </router-link>
              </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24">
          <searh @onSubmit="searhSubmit" ></searh>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24">
          <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="listLoading">
            <el-tab-pane label="待办审批" name="getTodoTask">
              <el-col :xs="24" :sm="24" :lg="24">
                <tab-list :approvalList="approvalList" />
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已办审批" name="getDoneTask">
              <el-col :xs="24" :sm="24" :lg="24">
                <handledList :approvalList="approvalList" />
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="我提交的审批" name="getMySubmitTask">
              <el-col :xs="24" :sm="24" :lg="24">
                <submit-list :approvalList="approvalList" />
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已办结的审批" name="getFinishApply">
              <el-col :xs="24" :sm="24" :lg="24">
                <submit-list :approvalList="approvalList" />
              </el-col>
            </el-tab-pane>
            <!-- <el-tab-pane label="下属的待办审批" name="getTodoTask1">
              <el-col :xs="24" :sm="24" :lg="24">
                <tab-list :approvalList="approvalList" />
              </el-col>
            </el-tab-pane> -->
          </el-tabs>
          <el-pagination
            style="margin-top:20px;"
            background
            @current-change="handleCurrentChange"
            :current-page="approvalList.number+1"
            :page-size="approvalList.size"
            layout="total, prev, pager, next"
            :total="approvalList.totalElements|formatNum(approvalList.totalElements)">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { fetchDataList } from '@/api/form'
import searh from './modules/tabForm/seach'
// import ApiComponent from '@/components/ApiComponent'
// import ApprovalType from './approval-type'
import tabList from './modules/tabList'
import handledList from './modules/tabList/handled'
import submitList from './modules/tabList/submitList'

export default {
  name: 'ProcessCenter',
  filters: {
    formatNum(val) {
      return Number(val)
    },
    formatTime(val) {
      return moment(Number(val)).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  components: {
    tabList,
    handledList,
    submitList,
    searh

  },
  data() {
    return {
      listLoading: false,
      activeName: 'getTodoTask',
      totalElements: 1,
      pageNumber: 0,
      pageSize: 10,
      approvalList: {},
      searchParams: {},
      url: 'getTodoTask'
    }
  },
  computed: {
    ...mapGetters([
      // 'permission_routes',
      'code',
      'orgCode'
    ])
    // rows() {
    //   return this.pagesData.data
    // }
  },

  created() {
    this.fetchData('getTodoTask')
  },
  methods: {
    searhSubmit(val) {
      // debugger
      this.pageNumber = 0
      this.searchParams = val
      this.fetchData(this.url, val)
    },
    fetchData(url, params) {
      this.listLoading = true
      const par = {
        pageNumber: this.pageNumber - 1 >= 0 ? this.pageNumber : 0,
        pageSize: this.pageSize
      }
      if (params) {
        par.paramVo = params
        par.pageNumber = this.pageNumber - 1 >= 0 ? this.pageNumber : 0
      }
      fetchDataList(par, `/process/apply/${url}`, 'POST').then(res => {
        this.listLoading = false
        this.approvalList = res.data
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },

    handleCurrentChange(val) {
      this.pageNumber = val - 1
      this.fetchData(this.activeName, this.searchParams)
      // sessionStorage.setItem('isBack', 'false')
      // this.number = val - 1
      // if (this.activeName === '1') {
      //   this.fetchData('/getNoticePageByOrgCode')
      // } else {
      //   this.fetchData('/getNoticePage')
      // }
    },
    handleClick(val) {
      this.pageNumber = 0
      this.activeName = val.name
      this.url = val.name
      this.fetchData(val.name, this.searchParams)
    }
  }

}
</script>


