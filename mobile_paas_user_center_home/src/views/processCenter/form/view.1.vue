<template>
  <div>
    <PreviewFormPanel
          style="padding:10px;border-radius:8px;"
          v-if="show"
          :value="value"
          :formData="formData"
          ref="designForm"
          id="designForm"
        />
  </div>
</template>

<script>
import {getAction} from '@/api/data'
import PreviewFormPanel from '@/form-design/preview-form-panel'
  export default {
    data() {
      return {
        show:false,
        value: {},
        formData: {},
      }
    },
    components: {
      PreviewFormPanel,
    },
    created () {
      this.fetchListData()
    },
    methods: {
      fetchListData() {
        this.loading = true
        getAction('/mock/formExa1.json').then(res=>{
          // debugger
          this.show = true
          this.loading = false
          console.log(res.data.formContent)
          const formRole = res.data.formRole
          const value = res.data.formContent
          const formaterValue = value.elements
          formaterValue.forEach((val, i) => {
            formRole.forEach((el, index) => {
              if (val.key === el.key) {
                val.shown = el.shown
                val.readonly = el.readonly
              }
            })
          })
          this.historyTaskId = res.data.id
          this.value = value
          this.formData = res.data.formData || {}
        }) 
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>