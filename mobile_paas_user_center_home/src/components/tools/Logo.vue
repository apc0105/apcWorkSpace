<template>
  <div class="logo">
    <a href="javascript:;">
      <!-- <LogoSvg alt="logo" /> -->
      <img :src="logo" alt="" />
      <h1 v-if="showTitle">中国移动-客户管理</h1>
    </a>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo1.svg?inline'

import logo from '@/assets/logo2.png'
export default {
  name: 'Logo',
  components: {
    // LogoSvg
  },
  data() {
    return {
      logo: logo
    }
  },
  props: {
    title: {
      type: String,
      default: 'Ant Design Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
