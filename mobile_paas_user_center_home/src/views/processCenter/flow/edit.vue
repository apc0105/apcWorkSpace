<template>
  <a-modal
      width="100%"
      title="编辑流程"
      :visible="addVisible"
      
      :confirmLoading="modalLoading"
      @cancel="handleAddCancel"
      style="top:0px"
      :destroyOnClose="true"
      :footer="null"
    >
    <add-flow :flowBaseData="flowBaseData" @changeModalStatus="changeModalStatus"></add-flow>
  </a-modal>
</template>

<script>
  import addFlow from '@/views/flow'
  export default {
    components:{
      addFlow
    },
    props: {
      flowBaseData:{
        type:Object,
        default:()=>{}
      },
      addVisible: {
        type: Boolean,
        default: false
      },
      modalLoading:{
        type:Boolean,
        default:false
      },
    },
    methods: {
      changeModalStatus(val){
        console.log(val)
        this.$emit('changeAddFormModal',val,'add','editFlow',11)
      },
      handleAddOk(){
        this.$emit('changeAddFormModal',false,'add','editFlow',11)
      },
      handleAddCancel(){
        this.$emit('changeAddFormModal',false,'remove','editFlow')
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>   