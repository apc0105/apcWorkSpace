<template>
  <el-popover style="width:200px" v-model="visible1">
    <p style="padding: 0 16px;line-height: 20px;">
      <i class="el-icon-info color-danger" style="font-size: 20px"/>
      <span style="vertical-align: top" class="color-danger">{{i18n('message.confirmDelete')}}</span>
    </p>
    <div style="text-align: right; margin:0px 8px 0px 0px;">
      <el-button size="mini" type="text" @click="close">{{i18n('operation.cancel')}}</el-button>
      <el-button type="primary" size="mini" @click="click">{{i18n('operation.confirm')}}</el-button>
    </div>
    <el-button slot="reference" size="mini" type="danger" style="margin:0px 8px 0px 0px;">{{i18n('operation.batchDelete')}}</el-button>
  </el-popover>
</template>

<script>
  export  default{
    name: 'delete-batch',
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
