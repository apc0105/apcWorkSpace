<template>
  <div style="height:100%;">
    <div class="map_box menu">
      <headers
        @handleLogout="handleLogout"
        @goHome="goHome"/>
      <!-- <img src="../../assets/menu.png" class="map"/> -->
      <div class="index_ty2"></div>
      <div class="index_ty3"></div>
      <div class="index_ty4"></div>
      <div class="index_ty5"></div>
      <div id="stage">
        <router-link :to="item.path" v-for="(item,index) in filterMenus" :key="index"><span>{{ item.name }}</span></router-link>
        <!--<a href="javascript:;" alt=""><span>设备管理</span></a>
        <a href="javascript:;" alt=""><span>车辆信息查询</span></a>
        <a href="javascript:;" alt=""><span>重点车辆报警</span></a>
        <a href="javascript:;" alt=""><span>车牌陌生分析</span></a>
        <a href="javascript:;" alt=""><span>重点车辆库</span></a>
        <a href="javascript:;" alt=""><span>小区常驻车辆库</span></a>
        <a href="javascript:;" alt=""><span>人脸抓拍检测</span></a>
        <a href="javascript:;" alt=""><span>重点人员监控</span></a>
        <a href="javascript:;" alt=""><span>重点人员告警</span></a>
        <a href="javascript:;" alt=""><span>陌生人员分析</span></a>
        <a href="javascript:;" alt=""><span>小区常驻人员库</span></a> -->
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import headers from '@/views/home/modules/header'
import { permissionHandle } from '@/utils/permissions'
import { asyncRouterMap } from '@/config/router.config'
export default {
  data () {
    return {
      menus: [],
      filterMenus: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.start()
    })
    this.getMenu()
  },
  components: {
    headers
  },
  methods: {
    getMenu () {
      this.menus = []
      asyncRouterMap[0].children.forEach(element => {
        if (element.path === '/residence') {
          element.children.forEach(res => {
            res.hidden = !(permissionHandle(res.path))
            console.log(permissionHandle(res.path))

            this.menus.push(res)
          })
        }
        if (element.path === '/vehicle') {
          element.children.forEach(res => {
            res.hidden = !(permissionHandle(res.path))
            this.menus.push(res)
          })
        }
        if (element.path === '/person') {
          element.children.forEach(res => {
            res.hidden = !(permissionHandle(res.path))
            this.menus.push(res)
          })
        }
        this.filterMenus = []
        this.menus.forEach(res => {
          if (!res.hidden) {
            this.filterMenus.push(res)
          }
          console.log(this.filterMenus)
        })
        //  console.log(JSON.parse(getPermission()), asyncRouterMap)
        // this.menus[this.menus.length - 1].hidden = !(permissionHandle('/system'))
        // this.menus.forEach((val, index) => {
        //   // if (index > 3) {
        //   val.hidden = !(permissionHandle(val.path))
        //   console.log(val.path, index)
        //   if (val.children) {
        //     val.children.forEach(el => {
        //       el.hidden = !(permissionHandle(el.path))
        //     })
        //   }
        //   // }
        // })
      })
    },
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
    start () {
      var timer
      var deg = 0
      /* Storing all the images into a variable */

      var images	= $('#stage a').removeClass('default').addClass('animationReady')
      var dim		= { width: 148 / 1.2, height: 99 / 1.2 }
      var cnt = images.length

      /* Finding the centers of the animation container: */
      var centerX = $('#stage').width() / 2
      var centerY = $('#stage').height() / 2 - dim.height / 2

      function rotate (step, total) {
        // This function loops through all the phone images, and rotates them
        // with "step" degrees (10 in this implementation) until total has reached 0

        /* Increment the degrees: */
        deg += step

        var eSin, eCos, newWidth, newHeight, q

        /* Loop through all the images: */
        for (var i = 0; i < cnt; i++) {
          /* Calculate the sine and cosine for the i-th image */

          q = ((360 / cnt) * i + deg) * Math.PI / 180
          eSin		= Math.sin(q)
          eCos		= Math.cos(q)

          /*
			/	With the sine value, we can calculate the vertical movement, and the cosine
			/	will give us the horizontal movement.
			*/

          q = (0.7 + eSin * 0.4)
          newWidth	= q * dim.width
          newHeight	= q * dim.height

          /*
			/	We are using the calculated sine value (which is in the range of -1 to 1)
			/	to calculate the opacity and z-index. The front image has a sine value
			/	of 1, while the backmost one has a sine value of -1.
			*/
          var numx = 0.4 * parseInt($(window).width())
          var numy = 0.0786 * parseInt($(window).height())
          images.eq(i).css({
            top: centerY + numy * eSin - 600,
            left: centerX + numx * eCos - 50,
            opacity: 0.8 + eSin * 0.6,
            marginLeft: -newWidth / 2,
            zIndex: Math.round(80 + eSin * 2000)
          })
        }

        total -= Math.abs(step)
        if (total <= 0) return false

        // Setting the function to be run again in 40 seconds (equals to 25 frames per second):
        // setTimeout(function(){rotate(step,total)},40);
      }

      // Running the animation once at load time (and moving the iPhone into view):
      if ($('#stage a').length >= 1) {
        rotate(0.1, 360 / cnt)
      }

      $('#stage a').hover(function () {
        if ($('#stage a').length >= 1) {
          clearInterval(timer)
        }
      }, function () {
        if ($('#stage a').length >= 1) {
          timer = setInterval(function () {
            rotate(0.1, 360 / cnt)
          }, 1)
        }
      })
	    timer = null
      if ($('#stage a').length >= 1) {
        timer = setInterval(function () {
          rotate(0.1, 360 / cnt)
        }, 1)
      }

      // 各种浏览器兼容
      var hidden, state, visibilityChange
      if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden'
        visibilityChange = 'visibilitychange'
        state = 'visibilityState'
      } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden'
        visibilityChange = 'mozvisibilitychange'
        state = 'mozVisibilityState'
      } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden'
        visibilityChange = 'msvisibilitychange'
        state = 'msVisibilityState'
      } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden'
        visibilityChange = 'webkitvisibilitychange'
        state = 'webkitVisibilityState'
      }

      // 添加监听器，在title里显示状态变化
      document.addEventListener(visibilityChange, function () {
        // document.title = document[state];
        if (document.hidden) {
          // 用户没有在看本页面，
          if ($('#stage a').length > 3) {
            clearInterval(timer)
          }
        } else {
          if ($('#stage a').length > 3) {
            timer = setInterval(function () {
              rotate(0.1, 360 / cnt)
            }, 1)
          }
        }
      }, false)
    }
  }
}
</script>
<style lang="css">
   #stage{left:50%;position:absolute;width:90%;height:100%;top: 69%;transform: translateX(-50%);z-index: 10;}
  #stage img{display:none;}
  #stage .animationReady{display:block;position:absolute;top:0;left:0;}
  .title{position: absolute;left: 30%;    top: 25%;width: 40%;}
  #stage a{position: relative;display: block;}
  #stage a .stage_bg{width: 100%;height: 100%;}
  #stage a img{display: none !important;}
  /* #stage a span */
  .stage_icon{display: block !important;position: absolute;left: 59%;top: 18%;width:12%;}
  #stage a span{color: #fff;display: block;}
</style>
