<template>
  <div>
    <div v-html="url"></div>
  </div>
</template>
<style>

</style>
<script>
export default {
  // 使用时请使用 :url.sync=""传值
  props: {
    url: {
      required: true
    }
  },
  data () {
    return {
      loading: false,
      html: ''
    }
  },
  watch: {
    url (value) {
      this.load(value)
    }
  },
  mounted () {
    this.load(this.url)
  },
  methods: {

  }
}
</script>
