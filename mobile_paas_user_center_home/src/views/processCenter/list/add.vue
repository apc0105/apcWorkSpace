<template>
  <div class="dashboard-editor-container">
      <el-row class="main" style="background:#fff;padding:16px 16px;margin-bottom:12px;;min-height:calc(100vh - 90px)" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24" v-for="item in approvalList " :key="item.id" style="border: 1px #eee solid;
    border-radius: 5px;margin-bottom: 20px;">
          <div class="categoryList" >
            <div class="title">
              <el-row>
                <el-col>
                  <div class="icon"><svg-icon :icon-class="`approval-${item.icon}`" style=" font-size:22px;vertical-align: middle; "></svg-icon></div>
                  <div class="text">{{item.name}}</div>
                </el-col>
              </el-row>
              <!-- <div class="operation">展开</div> -->
            </div>
            <div class="approvalList" v-if="item.applyFormList.length" >
              <el-col :xs="6" :sm="4" :lg="4" v-for="approval in item.applyFormList" :key="approval.id" style="margin-bottom:10px;"  >
                <el-tooltip class="item" effect="dark" :content="approval.name" placement="bottom-end">
                  <!-- <router-link :to="{path:'/processCenter/creatApproval',query:{id:approval.id}}"> -->
                    <el-card class="box-card" @click.native="isJump(approval.id)" shadow="hover">
                      <!-- <img :src="defaultForm" alt="" > -->
                      <svg-icon icon-class="card" style="color:#81baf4; font-size:30px; " />
                      <h4>{{approval.name}}</h4>
                    </el-card>
                  <!-- </router-link> -->
                </el-tooltip>
              </el-col>
            </div>
          </div>
        <!-- <ApiComponent slot="empty" :data="pagesData"  :showEmpty="false">
          <ApprovalType v-for="item in approvalList" :key="item.id" :data="item"
                        />
        </ApiComponent> -->
        </el-col>
      </el-row>
  </div>
</template>
<script>
import defaultForm from '@/assets/form.png'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { fetchDataList, fetchApply } from '@/api/form'

export default {
  name: 'ProcessCenter',
  filters: {
    formatTime(val) {
      return moment(Number(val)).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  components: {

  },
  data() {
    return {
      defaultForm,
      activeName: sessionStorage.getItem('activeName') || '0',
      totalElements: 1,
      number: 0,
      size: 3,
      pagesData: {
        data: []
      },
      approvalList: [],
      noticeList: [] // 公告列表

      // lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      // 'permission_routes',
      'code',
      'orgCode'
    ]),
    rows() {
      console.log(this.pagesData)
      return this.pagesData.data
    }
  },

  created() {
    // alert(1111)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchDataList({}, '/process/applyForm/findAll', 'POST').then(res => {
        this.approvalList = res.data
      }).catch(err => {
        // alert(111)
        console.log(err)
      })
    },
    isJump(applyId) {
      fetchApply({ applyId }, `/process/apply/loadCreateNew/${applyId}`, 'POST').then(res => {
        // console.log(res)
        const isJump = res.data.isOwner
        // console.log(isJump)
        if (!isJump) {
          this.$message({
            message: '无权限',
            type: 'warning'
          })
        } else {
          this.$router.push({
            path: `/processCenter/form/view/${applyId}`
            // query: { id: applyId }
          })
        }

        // this.approvalList = res.data
      }).catch(err => {
        // alert(111)
        console.log(err)
      })
    }
  }

}
</script>
<style lang="scss">
.categoryList{
  .title{
    margin: 0 -10px;
    height:40px;
    line-height: 40px;
    border-bottom: 1px #eeeeee solid;
    position: relative;
    padding: 0;
    .icon {
      border-top-left-radius: 5px;
      width: 40px;
      text-align: center;
      color: #fff;
      background: #81baf4;
      float:left;
    }
    .text{
      float:left;
      padding-left:5px;
      line-height: 42px;
    }

  }
  .approvalList{
    .box-card{
      text-align: center;
      cursor: pointer;
    }
    padding:10px 0;
    img{
      width: 50px;
      height: auto;
      display:block;
      margin: 0 auto;
    }
    h4{
      text-align: center;
      padding: 0;
      margin: 0;
      padding-top:10px ;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


