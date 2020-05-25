<template>
  <div>
    <view-flow 
      :processContent="processContent" 
      :doneNode="doneNode" 
      :curNode="curNode">
    </view-flow>
  </div>
</template>

<script>
  import viewFlow from '@/views/flow/onlyView'
  export default {
    data() {
      return {
        processContent: '',
        doneNode: [],
        curNode: '',
      }
    },
    components:{
      viewFlow
    }
  }
</script>

<style lang="scss" scoped>

</style>   