<template>
  <span>
    <i class="el-icon-info"/><span v-html="text"/>
  </span>
</template>

<script>
  export  default{
    name: 'selected-info',
    props: {
      size: {
        type: Number,
        default: 0
      }
    },
    computed: {
      text(){
        const text = this.i18n('message.selectedInfo')
        return text.replace('{}', '<label>' + this.size + '</label>')
      },
    }
  }
</script>
