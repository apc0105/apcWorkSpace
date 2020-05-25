<template>
  <div class="scroll">
    <div class="home">
      <headers
        @handleLogout="handleLogout"
        @goHome="goHome"/>
      <section
        class="clearfix">
        <div class="home_main home_main_left">
          <div class="estate home_main_bg">
            <div class="home_main_bg_title">{{ residence.name }}</div>
            <div class="home_main_main">
              <span>
                <i class="icon community"></i>
                <div class="home_main_main_write">
                  <h2>社区</h2>
                  <p>{{ residence.name }}</p>
                </div>
              </span>
              <span>
                <i class="icon peopleCount"></i>
                <div class="home_main_main_write">
                  <h2>总人数</h2>
                  <p>{{ residence.total }}人</p>
                </div>
              </span>
              <span>
                <i class="icon pennant"></i>
                <div class="home_main_main_write">
                  <h2>幢数</h2>
                  <p>{{ residence.blockNum }}幢</p>
                </div>
              </span>
              <span>
                <i class="icon occupancy"></i>
                <div class="home_main_main_write">
                  <h2>入住率</h2>
                  <p>{{ residence.occupancyRate }}</p>
                </div>
              </span>
              <span>
                <i class="icon address"></i>
                <div class="home_main_main_write">
                  <h2>地址</h2>
                  <p>{{ residence.address }}</p>
                </div>
              </span>
            </div>
          </div>
          <div class="flow home_main_bg">
            <div class="home_main_bg_title">人车流量</div>
            <div class="home_main_count">
              <div class="home_main_statistics">
                <div class="home_main_statistics_other">{{ peopleAmount }}</div>
                <span>人总流量</span>
              </div>
              <div class="home_main_statistics">
                <div class="home_main_statistics_other">{{ carAmount }}</div>
                <span>车总流量</span>
              </div>
            </div>
          </div>
          <div class="age home_main_bg">
            <div class="home_main_bg_title">性别年龄</div>
            <div class="home_main_gender_age">
              <div class="home_main_gender">
                <div class="gender">
                  <i class="gender_man"></i>
                </div>
                <div class="gender">
                  <i class="gender_woman"></i>
                </div>
              </div>
            </div>
            <div class="home_main_progress">
              <ul>
                <li><p>20岁以下</p><p><a-progress :percent="AgeCount[1][0]" size="small" strokeColor="#ff1a56"/></p><p>{{ AgeCount[0][0] }}个</p></li>
                <li><p>20 - 30岁</p><p><a-progress :percent="AgeCount[1][1]" size="small" strokeColor="#f46843"/></p><p>{{ AgeCount[0][1] }}个</p></li>
                <li><p>30 - 40岁</p><p><a-progress :percent="AgeCount[1][2]" size="small" strokeColor="#01daaa"/></p><p>{{ AgeCount[0][2] }}个</p></li>
                <li><p>40 - 50岁</p><p><a-progress :percent="AgeCount[1][3]" size="small" strokeColor="#5397ff"/></p><p>{{ AgeCount[0][3] }}个</p></li>
                <li><p>50岁以上</p><p><a-progress :percent="AgeCount[1][4]" size="small" strokeColor="#f4b029"/></p><p>{{ AgeCount[0][4] }}个</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="home_main home_main_center">
          <div class="homo_main_center_title">实时人脸</div>
          <div class="home_main_center_pic clearfix">
            <ul class="clearfix">
              <li v-for="(item,index) in facePic" :key="index"><a href="javascript:;"><img v-lazy="upload_url + item.fileId"></a></li>
            </ul>
            <div class="home_main_center_right">
              <p>人员出入统计</p>
              <h1>{{ faceNum }}</h1>
              <!-- <p>人员外出统计</p>
              <h1>6174</h1> -->
            </div>
          </div>
          <div class="homo_main_center_title" style="margin-top:13px;">实时车辆</div>
          <div class="vehicle">
            <div class="home_main_vehicle">
              <div class="clearfix">
                <div class="home_main_city_vehicle">
                  <ul class="clearfix">
                    <li v-for="(item,index) in carPic" :key="index"><a href="javascript:;"><img v-lazy="upload_url + item.fileId"></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="vehicle_go_to">
              <div class="home_main_bg_title">车辆报警</div>
              <ul class="clearfix vehicle_header" style="margin-top:10px;">
                <li>车牌号</li>
                <li>卡口</li>
                <li>进入时间</li>
                <li>出去时间</li>
                <li>告警时间</li>
              </ul>
              <div class="vehicle_list ve_vehicle_list">

                <ul class="clearfix" v-for="(item,index) in carList" :key="index">
                  <a href="javascript:;">
                    <li>{{ item.carNum }}</li>
                    <li>{{ item.bayonet }}</li>
                    <li>{{ item.getIntoTime }}</li>
                    <li>{{ item.getOutTime }}</li>
                    <li>{{ item.createTime }}</li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="home_main home_main_right">
          <div class="vehicle_go_to home_main_bg right_vehicle">
            <div class="home_main_bg_title">人脸报警</div>
            <ul class="clearfix vehicle_header ">
              <li>姓名</li>
              <li>性别</li>
              <li>手机号</li>
              <li>地址</li>
            </ul>
            <div class="vehicle_list">
              <ul class="clearfix" v-for="(item,index) in faceList" :key="index">
                <a href="javascript:;">
                  <li>{{ item.name }}</li>
                  <li>{{ item.gender }}</li>
                  <li>{{ item.mobile }}</li>
                  <li :title="item.address">{{ item.address }}</li>
                </a>
              </ul>
            </div>
          </div>
          <div class="home_main_bg facility_type">
            <div class="home_main_bg_title">设备类型</div>
            <annulus/>
          </div>
          <div class="home_main_bg facility_status">
            <div class="home_main_bg_title">设备状态</div>
            <columnar/>
          </div>
        </div>
      </section>
      </headers>
    </div>
  </div>
</template>
<script>
import annulus from '@/views/home/modules/annulus'
import columnar from '@/views/home/modules/columnar'
import headers from '@/views/home/modules/header'
import { findResidenceInfo, findSnapUserAndResidenceId, findAKeyUser, findPeopleCarAmount, findCarAmount, findVehicleRecord, findAgeCount } from '@/api/home'
import { getResidenceId } from '@/utils/auth'
export default {
  components: {
    annulus,
    columnar,
    headers
  },
  data () {
    return {
      residence: {}, // 小区信息
      facePic: [],
      faceNum: [],
      upload_url: this.$UPLOAD_URL.UPLOAD_URL + 'image/',
      faceList: [],
      peopleAmount: '',
      carAmount: '',
      carPic: [],
      carList: [],
      AgeCount: []
    }
  },
  created () {
    this._findResidenceInfo()
    this._findSnapUserAndResidenceId()
    this._findAKeyUser()
    this._findCarAmount()
    this._findPeopleCarAmount()
    this._findVehicleRecord()
    this._findAgeCount()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  methods: {
    goHome () {
      this.$router.push('/dishboard')
    },
    handleLogout () {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          that.$store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        },
        onCancel () {
        }
      })
    },
    // 小区信息
    _findResidenceInfo () {
      return new Promise((resolve, reject) => {
        findResidenceInfo({ id: getResidenceId() }).then(res => {
          this.residence = res.data
        })
      })
    },
    // 性别年龄
    _findAgeCount () {
      return new Promise((resolve, reject) => {
        findAgeCount({ id: getResidenceId() }).then(res => {
          this.AgeCount = res.data
        })
      })
    },
    _findSnapUserAndResidenceId () {
      return new Promise((resolve, reject) => {
        findSnapUserAndResidenceId({ id: getResidenceId() }).then(res => {
          this.facePic = res.data
          this.faceNum = res.param[0].num
        })
      })
    },
    // 人脸报警（重点人员）
    _findAKeyUser () {
      return new Promise((resolve, reject) => {
        findAKeyUser().then(res => {
          this.faceList = res.data
        })
      })
    },
    _findPeopleCarAmount () {
      return new Promise((resolve, reject) => {
        findPeopleCarAmount({ id: getResidenceId() }).then(res => {
          this.peopleAmount = res.data[0].num
          this.carAmount = res.param[0].carNum
        })
      })
    },
    _findCarAmount () {
      return new Promise((resolve, reject) => {
        findCarAmount({ id: getResidenceId() }).then(res => {
          this.carPic = res.data
        })
      })
    },
    _findVehicleRecord () {
      return new Promise((resolve, reject) => {
        findVehicleRecord({ id: getResidenceId() }).then(res => {
          this.carList = res.data
        })
      })
    },
    handleScroll () {
      const clientHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (clientHeight > 1) {

      }
      console.log(clientHeight)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    }
  }
}
</script>
