<template>
  <div>
    <header class="home_top">
      <div class="home_top_left">
        {{ time }}
      </div>
      <div class="home_top_right">
        <!-- <span><a-icon type="menu-unfold" />菜单</span> -->
        <span @click="goHome"><a-icon type="home" />进入系统</span>
        <span><a-icon type="user" />{{ name }}</span>
        <span @click="handleLogout"><a-icon type="logout" />退出</span>
      </div>
    </header>
  </div>
</template>
<script>
import moment from 'moment'
import { getRole } from '@/utils/auth'
import { setInterval } from 'timers'
export default {
  data () {
    return {
      name: '',
      time: ''
    }
  },
  created () {
    this.name = getRole()
    setInterval(() => {
      this.time = moment().format('YYYY年MM月DD日 dddd HH:mm:ss')
    }, 1000)
  },
  filters: {
    dateformat (dataStr, pattern = 'YYYYMM-DD HH:mm:ss') {
      return moment(dataStr).format(pattern)
    }
  },
  methods: {
    handleLogout () {
      this.$emit('handleLogout')
    },
    goHome () {
      this.$emit('goHome')
    }
  }
}
</script>
