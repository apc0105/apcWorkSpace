<template>
  <a-modal
      width="100%"
      title="编辑流程"
      :visible="addVisible"
      @ok="handleAddOk"
      :confirmLoading="modalLoading"
      @cancel="handleAddCancel"
      style="top:0px"
    >
    <v-form :is-edit='false'></v-form>
  </a-modal>
</template>

<script>
  import VForm from './modules/url-form'

  export default {
    name: 'FlowDefformAdd',
    components: { VForm },
    props: {
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
      handleAddOk(){
        this.$emit('changeAddFormModal',false,'add','editForm',11)
      },
      handleAddCancel(){
        this.$emit('changeAddFormModal',false,'remove','editForm')
      },
    },
  }
</script>

