<template>
  <div class="page-header-index-wide">
    <a-row :gutter="8">
      <a-col
        :md="10"
        :lg="10"
        :xl="24"
        :xxl="13"
        :style="{ marginBottom: '8px' }">
        <div class="user_info">
          <a-row
            type="flex"
            justify="space-around"
            align="middle"
            style="padding-top:50px;">
            <a-col
              :xl="{ span: 15, offset: 1 }"
              :lg="{ span: 15, offset: 1 }">
              <!-- $DOWNLOAD_URL.DOWNLOAD_URL + userList.headId -->
              <img
                :src="$DOWNLOAD_URL.DOWNLOAD_URL + userList.headId"
                alt
                class="userImg" />
              <div class="user_info_info">
                <h2>{{ userList.name }}</h2>
                <p>
                  {{ userList.orgName }}
                  <span>{{ userList.phone }}</span>
                </p>
              </div>
            </a-col>
            <a-col
              :xxl="{ span: 8}"
              :xl="{ span: 5}"
              :lg="{ span: 5}">
              <a-avatar
                style="backgroundColor:#f0f6fe; color: #1690ff; float:left;"
                :size="64"
                icon="bell" />
              <div class="user_info_info login_info">
                <p>登录信息</p>
                <p>累计登录</p>
              </div>
              <span class="login_num">{{ userList.loginCnt }}</span>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col
        :sm="14"
        :md="15"
        :lg="16"
        :xl="17"
        :xxl="6"
        :style="{ marginBottom: '5px' }">
        <a-card
          :bodyStyle="{padding:'15px',height:'180px'}"
          :loading="loading"
          :bordered="false">
          <h2 class="home-title">
            订购到期提醒
            <a-badge
              :count="RemindCount"
              :offset="['5','0']" />
          </h2>
          <ul
            class="remind clearfix"
            style="overflow:hidden;overflow-y:auto;max-height:180px">
            <!-- 当业务提醒只显示几条时
           1.用新数组for循环push返回的数据的前n条 再讲新数组push进需要循环的列表数组中
           2.v-if 判定数组长度
            -->
            <li
              class="clearfix"
              v-for="(item,index) in remindList"
              :key="index">
              <a href="javascript:;">
                <p>{{ item.remindName }}</p>
                <span>{{ item.remindTime }}日到期</span>
              </a>
            </li>
          </ul>
        </a-card>
      </a-col>
      <a-col
        :sm="10"
        :md="9"
        :lg="8"
        :xl="7"
        :xxl="5"
        :style="{ marginBottom: '8px' }">
        <a-card
          :bodyStyle="{padding:'15px'}"
          :loading="loading">
          <h2 class="home-title">我的客户经理</h2>
          <!-- <img
            v-if="customerImage"
            :src="customerImage"
            alt
            style="margin-top:5px;float:left;" />
          <img
            v-else
            :src="lsf"
            alt
            style="margin-top:5px;float:left;" /> -->
          <div
            class="user_info_detail"
            style="margin-top:0">
            <!-- <h2>{{ customerList.name }}</h2> -->
            <!-- <p>{{ customerList.gender }}</p> -->

            <p><label>姓名：</label>{{ customerList.custmerName }}</p>
            <p><label>机构：</label>{{ customerList.orgName }}</p>
            <p><label>电话：</label>{{ customerList.phone }}</p>

            <!-- <span>{{ customerList.phone }}</span> -->
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row
      :gutter="8"
      type="flex"
      justify="flex-start "
      align="top">
      <a-col
        :md="19"
        :lg="19"
        :xl="19"
        :xxl="19"
        :style="{ marginBottom: '2px' }">
        <a-card
          :bodyStyle="{padding:'15px'}"
          :loading="loading">
          <h2 class="home-title">我的应用</h2>
          <ul class="home_apply">
            <li
              v-for="(item,index) in newAppList"
              :key="index"
              @click="toD(item)"
              class="applyLi">
              <a href="javascript:;">
                <!-- <icon-font :type="item.imgUrl"
                           class="icon-font-info"></icon-font> -->
                <div class="icon-font-info"><img :src="$DOWNLOAD_URL.DOWNLOAD_URL+item.img" /></div>

                <p>{{ item.title }}</p>
              </a>
            </li>
          </ul>
        </a-card>
        <!-- </a-col> -->
        <!-- <a-col
        :md="19"
        :lg="19"
        :xl="19"
        :xxl="19"
        :style="{ marginBottom: '12px' }"> -->
        <a-card
          :loading="loading"
          :bordered="false"
          :body-style="{padding: '0'}"
          style="margin-top:8px">
          <div class="salesCard">
            <a-tabs
              default-active-key="1"
              size="large"
              :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px', marginTop: '20px'}">
              <div
                class="extra-wrapper"
                slot="tabBarExtraContent"></div>
              <a-tab-pane
                loading="true"
                tab="2020年应用使用情况"
                key="1">
                <a-row>
                  <a-col
                    :xl="16"
                    :lg="12"
                    :md="12"
                    :sm="24"
                    :xs="24">
                    <bar
                      :data="barData"
                      title="2020年应用使用情况" />
                  </a-col>
                  <a-col
                    :xl="8"
                    :lg="12"
                    :md="12"
                    :sm="24"
                    :xs="24">
                    <rank-list
                      title="2020年应用使用情况排名"
                      :list="rank" />
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-card>
      </a-col>
      <!-- <a-row
        type="flex"
        justify="flex-start"
        align="top"
      > -->

      <a-col
        :md="4"
        :lg="2"
        :xl="5"
        :xxl="5"
        :style="{ marginBottom: '12px' }">
        <a-card
          class="count_card"

          :bodyStyle="{padding:'15px'}"
          :loading="loading"
          style="overflow:hidden;max-height:411px;overflow-y:auto;">
          <h2 class="home-title">政企应用推荐</h2>
          <div
            v-for="(item,index) in ServiceList"
            :key="index"
            class="home_product">
            <icon-font
              style="font-size:20px;"
              :type="item.icon"
              class="icon-font-info"></icon-font>
            <span style="padding-left:10px;">{{ item.app_name }}</span>
          </div>
        </a-card>

        <div style="margin-top:8px">
          <img
            :src="home1"
            alt
            :style="{ marginBottom: '8px', width: '100%' }" />
          <img
            :src="home2"
            alt
            :style="{ width: '100%' }" />
        </div>

      </a-col>
      <!-- <a-col
        :md="1"
        :lg="1"
        :xl="1"
        :xxl="1"
        :style="{ marginBottom: '12px' }">

      </a-col> -->
      <!-- </a-row> -->
    </a-row>

  </div>
</template>

<script>
// import ChartCard from '@/components/ChartCard'
import axios from 'axios'
import ACol from 'ant-design-vue/es/grid/Col'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import { RankList, Bar } from '@/components'
// import MiniArea from '@/components/charts/MiniArea'
// import MiniBar from '@/components/charts/MiniBar'
// import MiniProgress from '@/components/charts/MiniProgress'
// import RankList from '@/components/Charts/RankList'
// import Bar from '@/components/Charts/Bar'
// import LineChartMultid from '@/components/charts/LineChartMultid'
import HeadInfo from '@/components/tools/HeadInfo.vue'
import home from '@/assets/home.png'
// import Trend from '@/components/Trend'
// import { getLoginfo, getVisitInfo } from '@/api/api'
import home1 from '@/assets/home1.jpg'
import home2 from '@/assets/home2.jpg'
import homeUser from '@/assets/home-user.png'
import lsf from '@/assets/public/lsf.jpg'
import { Icon } from 'ant-design-vue'
// import { getToken } from '../../utils/auth' application
import { getApplyMessages, fetchCustomerMessage } from '@/api/classify'
import { getToken } from '../../utils/auth'

import { fetchBarData } from '@/api/classify'
import { fetchRandomServices } from '@/api/classify'
import { fetchServiceUsers } from '@/api/classify'
import { fetchTopServices } from '@/api/classify'
import { fixArry, appList } from '@/utils/json'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1726768_0of3b4llznfq.js'
})
export default {
  name: 'Analysis',
  components: {
    ATooltip,
    IconFont,
    ACol,
    RankList,
    Bar,
    HeadInfo
  },
  data () {
    return {
      userList: {}, // 接受用户信息
      customerImage: '',
      newAppList: [], // 接受筛选后的订阅列表
      applyList: appList,
      customerList: {},
      fixArry,
      lsf: lsf,
      homeUser: homeUser,
      home1: home1,
      home2: home2,
      home: home,
      loading: true,
      center: null,
      rank: [],
      remindList: [],
      RemindCount: 0,
      barData: [],
      loginfo: {},
      ServiceList: [],
      visitFields: ['ip', 'visit'],
      visitInfo: [],
      indicator: <a-icon type="loading" style="font-size: 24px" spin />,
      tooltip: ['x*y', (x, y) => {
        return
        ({
          name: 'x',
          value: y
        })
      }]
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    // this.initLogInfo()
    // 从本地调取登录验证成功后当时存储的用户信息
    this.userList = JSON.parse(window.localStorage.message)
    console.log('打印用户登录信息', this.userList)
    // 请求barData数据
    this.fetchCustomerMessage()
    this.fetchBarData()
    this.fetchRandomServices()
    this.fetchServiceUsers()
    this.fetchTopServices()
  },
  mounted () {
    // 调取用户信息中的id,dom挂在完毕后执行 ==> 通过用户id获取所订阅的应用列表
    const id = this.userList.id
    this.getApplyMessages(id)
  },
  methods: {
    // 封装时间格式的函数
    localDate (value) {
      const date = new Date(value)
      const Month = date.getMonth() + 1
      const Day = date.getDate()
      // Day=parseInt(date / 60 / 60 / 24, 10);
      const Hours = date.getHours()
      // Hours = parseInt((date / 60 / 60) % 24, 10);
      const Minutes = date.getMinutes()
      // Minutes = parseInt((date / 60) % 60, 10);  这个转换的时间有点误差，不过倒计时可以用这个
      const Seconds = date.getSeconds()
      // Seconds = parseInt(date % 60, 10);  这个转换的时间有点误差，不过倒计时可以用这个
      const Y = date.getFullYear() + '-'
      const M = Month >= 10 ? Month + '' : '0' + Month + '/'
      const D = Day >= 10 ? Day + ' ' : '0' + Day + ' '
      const H = Hours >= 10 ? Hours + ':' : '0' + Hours + ':'
      const Mi = Minutes >= 10 ? Minutes + ':' : '0' + Minutes + ':'
      const S = Seconds >= 10 ? Seconds : '0' + Seconds
      // return Y + M + D + H + Mi + S;
      return M + D
    },
    // 获取客户经理信息
    fetchCustomerMessage () {
      fetchCustomerMessage('/index/count/randomCustomer').then(res => {
        console.log('客户经理信息列表', res.data)
        console.log('this.$DOWNLOAD_URL.DOWNLOAD_URL', this.$DOWNLOAD_URL.DOWNLOAD_URL)
        this.customerList = res.data
        // this.customerList.gender === '1' ? this.customerList.gender = '女' : this.customerList.gender = '男'
        // if (this.customerList.depPosition === '1') {
        //   this.customerList.depPosition = '总经理'
        // } else if (this.customerList.depPosition === '2') {
        //   this.customerList.depPosition = '经理'
        // } else if (this.customerList.depPosition === '3') {
        //   this.customerList.depPosition = '业务主管'
        // } else {
        //   this.customerList.depPosition = '职员'
        // }
        this.customerImage = this.$DOWNLOAD_URL.DOWNLOAD_URL + this.customerList.portrait
      })
    },
    // 政企应用使用情况数据
    fetchBarData () {
      fetchBarData('/index/count/chartServices').then(res => {
        console.log('政企应用使用情况数据', res.data)
        this.barData = []
        const data = res.data
        data.forEach(item => {
          this.barData.push({
            x: item.time_str,
            type: 'aaaaaaaa',
            y: parseInt(item.count)// 必须先转换成为数字才可以使用
          })
        })

        console.log('打印barData', this.barData)
      })
    },
    // 获取政企应用推荐数据
    fetchRandomServices () {
      fetchRandomServices('/index/count/randomServices').then(res => {
        console.log('政企应用推荐数据', res.data)
        const data = res.data
        this.ServiceList = data.map(item => {
          const tempItem = this.applyList.find(it => it.appCode == item.app_code)
          if (tempItem) {
            return {
              ...item,
              icon: tempItem.imgUrl
            }
          } else {
            return {
              ...item,
              icon: 'icon-other'
            }
          }
        })
        console.log('打印ServiceList', this.ServiceList)
      })
    },
    getArrIndex (arr, obj) {
      let index = null
      const key = Object.keys(obj)[0]
      arr.every(function (value, i) {
        if (value[key] === obj[key]) {
          index = i
          return false
        }
        return true
      })
      return index
    },
    // 获取服务订购到期提醒数据
    fetchServiceUsers () {
      fetchServiceUsers('/index/count/serviceUsers').then(res => {
        console.log('服务订购到期提醒数据', res.data)
        const data = res.data
        data.forEach(item => {
          const newTime = this.localDate(parseInt(item.timestr))
          console.log('打印新的提醒数据', newTime)
          this.remindList.push({
            remindName: item.app_name,
            remindTime: newTime
          })
          console.log('打印remindList', this.remindList)
          this.RemindCount = this.remindList.length
        })
      })
    },
    // 获取应用使用排名数据
    fetchTopServices () {
      fetchTopServices('/index/count/topServices').then(res => {
        console.log('应用使用排名数据', res.data)
        const data = res.data
        data.forEach(item => {
          this.rank.push({
            name: item.app_name,
            total: item.EXPIRE_TIME
          })
          // rank排序
          this.rank.sort((a, b) => {
            return b.total - a.total
          })
          console.log('打印得到的数组rank', this.rank)
        })
      })
    },
    initLogInfo () {
      getLoginfo(null).then((res) => {
        if (res.success) {
          Object.keys(res.result).forEach(key => {
            res.result[key] = res.result[key] + ''
          })
          this.loginfo = res.result
        }
      })
      getVisitInfo().then(res => {
        if (res.success) {
          console.log('aaaaaa', res.result)
          this.visitInfo = res.result
        }
      })
    },
    // 点击单个应用的时候，同时携带token，通过window.open()打开新的页面
    toD (item) {
      window.open(item.url + `?token=${getToken()}`)
    },
    // 获取所有应用列表数据
    getApplyMessages (id) {
      getApplyMessages(`/cfgAppOrder/findAppbyUserId/${id}`).then(res => {
        // console.log("打印返回的应用总数据",res)
        const { message, retCode, data } = res
        // console.log("打印retCode",retCode)
        if (retCode !== 200) {
          this.$message.error(res.message)
          return// 如果获取数据失败，在函数中，只要return函数就会直接返回
        }
        // 给data数组重新按小到大排序
        data.sort((a, b) => {
          return a.appNo - b.appNo
        })
        // console.log("打印重新排序后的应用列表",data)
        // 筛选过滤得出新的数组
        data.forEach(item => {
          // 遍历返回得到的data数组，每一项都在总数组中查找，如果有并且数值相等，则用新数组接受
          // 从而将总数组中有这一项的整个item保存到新数组中
          const tempItem = this.applyList.filter(it => it.appCode.startsWith(item.appCode))

          // this.applyList.find(it=>it.appCode === item.appCode)
          // const tempItem = this.applyList.find(it=>{return it.appCode === item.appCode})
          // 将appNo也同时拷贝到新书组item中的item项中，从而新数组的item也是根据appNo重新从大到小排列
          if (tempItem.length > 0) {
            this.newAppList.push(Object.assign(tempItem[0], { appNo: item.appNo, url: item.indexUrl, title: item.appName, img: item.listFileId }))//, url:item.url
            console.log('this.newAppList', this.newAppList)
          }
        })
        // this.fixArry.forEach(item => {
        //   this.newAppList.push(item)
        // })
        // console.log('打印筛选后的新数组',this.newAppList)
      })
    },
    toApply (id) {
      toApply(`/cfgAppOrder/findAllByAppId/${id}`).then(res => {

      })
    }
  } }
</script>

<style lang="less" scoped>
.icon-font-info {
  font-size: 30px;
  color: #1690ff;
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.icons-list .anticon {
  margin-right: 6px;
  font-size: 24px;
}
.circle-cust {
  position: relative;
  top: 28px;
  left: -100%;
}
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 0.95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }
  p {
    line-height: 42px;
    margin: 0;
    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
.home_apply li {
  margin: 0 2px;
  a {
    width: 118px;
    display: inline-block;
    text-align: center;
    .icon-font-info {
      margin: 0 auto 7px;
      padding-top: 17px;
    }
  }
}
.home_product {
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user_info .login_num {
  font-size: 30px;
  color: #fff;
  margin-top: 9px;
  padding-left: 166px;
  display: block;
}
.user_info_detail {
  margin-top: 0;
  p {
    margin: 0;
  }
  h2 {
    margin-top: 2px;
  }
}
.userImg {
  float: left;
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
