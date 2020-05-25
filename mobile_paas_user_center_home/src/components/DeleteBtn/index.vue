<template>
  <el-popover style="width:200px" v-model="visible1">
    <p style="padding: 0 16px;line-height: 20px;">
      <i class="el-icon-info color-danger" style="font-size: 20px"/>
      <span style="vertical-align: top" class="color-danger">{{i18n('message.confirmDelete')}}</span>
    </p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="close">{{i18n('operation.cancel')}}</el-button>
      <el-button type="primary" size="mini" @click="click">{{i18n('operation.confirm')}}</el-button>
    </div>
    <el-button slot="reference" :size="size" :icon="icon" type="danger" :class="className">{{btnText}}</el-button>
  </el-popover>
</template>

<script>
  export  default{
    name: 'delete-btn',
    props: {
      size: {
        type: String,
        default: 'mini'
      },
      icon: {
        type: String,
      },
      text: {
        type: String,
      },
      className: {
        type: String,
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      btnText(){
        if (this.showText) {
          return this.text || this.i18n('operation.delete')
        }
      }
    },
    data(){
      return {
        visible1: false
      }
    },
    methods: {
      show(){
        this.visible1 = true
      },
      close(){
        this.visible1 = false
      },
      click(){
        this.$emit('click')
        this.close()
      }
    }
  }
</script>
