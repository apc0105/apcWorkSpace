<template>
  <div class="dashboard-editor-container">
      <el-row class="main" style="background:#f9f9f9;padding:16px 16px;margin-bottom:12px;;min-height:calc(100vh - 90px);overflow-x:auto" v-loading="loading" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24" class="formBox"  >
          <PreviewFormPanel style="padding:10px;border-radius:8px;min-height:calc(100vh - 200px)"  v-if="show" :value="value" :formData="formData" ref="designForm" id="designForm"/>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import PreviewFormPanel from '@/form-design/preview-form-panel'
// import { MessageBox } from 'element-ui'
// import defaultForm from '@/assets/form.png'
// import moment from 'moment'
import { mapGetters } from 'vuex'
import { fetchDataList } from '@/api/form'

export default {
  name: 'creatApproval',
  components: {
    PreviewFormPanel
    // ApiComponent

  },
  data() {
    return {
      loading: false,
      show: false,
      value: {},
      formData: {},
      signData: {},
      taskList: [],
      signHistory: []

    }
  },
  computed: {
    ...mapGetters([
      'code',
      'orgCode'
    ])
  },

  created() {
    this.fetchData()
    // console.log(this.$route)
    console.log(this.$route.params)
  },
  methods: {
    fetchData() {
      this.loading = true
      let url = 'loadCreateNew'
      if (this.$route.query.url) {
        url = this.$route.query.url
      }
      fetchDataList({ applyId: this.$route.params.id }, `/process/apply/${url}/${this.$route.params.id}`, 'POST').then(res => {
        this.show = true
        this.loading = false

        this.value = JSON.parse(res.data.formContent)
        this.formData = res.data.formData && JSON.parse(res.data.formData) || {}

        this.taskList = res.data.taskEntity.taskButtons
        // this.approvalList = res.data
      }).catch(err => {
        alert(111)
        console.log(err)
      })
    },
    confirm(val) {
      if (val === 'submitTask') {
        console.log(this.formData)
        this.$refs['designForm'].validate(valid => {
          console.log(valid)
          const params = {}
          if (this.$route.query.url) {
            params.taskId = this.$route.query.id
          } else {
            params.applyId = this.$route.query.id
          }
          params.formData = this.formData
          if (valid) {
            console.log(params)
            // this.closePreview()
            // MessageBox.alert(this.formData)
            fetchDataList(params, `/process/apply/executeApply`, 'POST').then(res => {
              this.$message({
                message: '保存表单成功',
                type: 'success'
              })
              this.$router.push('/processCenter/index')
              console.log(res)
            }).catch(err => {
              alert(111)
              console.log(err)
            })
          }
        })
      } else if (val === 'back') {
        // this.$router.push('/processCenter/index')
        this.$router.go(-1)
      }
    },
    closePreview() {
      this.previewPc = false
      this.previewMobile = false
    },
    print() {
      // const content = document.getElementById('designForm')
      // console.log(content.innerHTML)
      // console.log(this.$refs.designForm)
      // document.body.innerHTML = content.innerHTML
      // window.print()
      const subOutputRankPrint = document.getElementById('designForm')
      console.log(subOutputRankPrint.innerHTML)
      const newContent = subOutputRankPrint.innerHTML
      const oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    }
  }

}
</script>
<style lang="scss">
.operation{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  // border-bottom:1px #eeeeee solid;
  .option{
    cursor: pointer;
    padding: 10px 10px;
    &:hover{
      background: #eee;
    }
  }
}
.footer{
  text-align: center;
  margin-top: 20px;
}
</style>


