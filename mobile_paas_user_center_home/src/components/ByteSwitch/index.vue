<template>
  <el-switch :value="value" active-color="#13ce66" inactive-color="#ff4949" :active-text="activeText"
             :inactive-text="inactiveText" :active-value="1" :inactive-value="0" @change="onChange" @input="onInput"/>
</template>
<script>
  export default {
    name: 'byte-switch',
    props: {
      value: Number,
      activeText: String,
      inactiveText: String,
    },
    methods: {
      onChange(e){
        this.$emit('change', e)
      },
      onInput(e){
        this.$emit('input', e)
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>

</style>
