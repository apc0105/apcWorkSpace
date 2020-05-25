<template>
  <div>
    <iframe id="mainContent" height="700" width="100%" :src="url"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: this.$STATIC_URL.STATIC_URL + 'webroot/decision/view/report?viewlet=project.cpt&op=view'
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
