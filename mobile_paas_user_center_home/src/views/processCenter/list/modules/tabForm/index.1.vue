<template>
  <div class="dashboard-editor-container">
      <el-row class="main" style="background:#f9f9f9;padding:16px 16px;margin-bottom:12px;;min-height:calc(100vh - 90px);overflow-x:auto" v-loading="loading" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24" class="formBox"  >
          <div class="operation">
            <el-button-group >
              <el-button  @click="confirm('back')" type="primary" size="small" >返回</el-button>
              <el-button  @click="print()" type="primary" size="small" >打印</el-button>
              <el-button v-for="item in taskList" @click="confirm(item.btnId)" :key="item.btnName" type="primary" size="small" >{{item.btnName}}</el-button>
              <el-dropdown v-if="taskMoreList.length">
                <el-button type="primary" size="small" split-button >
                  更多...
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in taskMoreList" @click.native="confirm(item.btnId)" :key="item.btnName">{{item.btnName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button-group>
          </div>
          <PreviewFormPanel style="padding:10px;border-radius:8px;"  v-if="show" :value="value" :formData="formData" ref="designForm" id="designForm"/>
          <el-dialog
            title="查看流程"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose">
            <flowView :processContent="processContent" :doneNode="doneNode" :curNode="curNode"></flowView>
          </el-dialog>
          <el-dialog
            :title="title"
            :visible.sync="rejectVisible"
            width="40%"
            :before-close="handleClose">
            <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
              <el-form-item :label="label" prop="comment">
                <el-input type="textarea" v-model="form.comment" ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="rejectVisible = false">取 消</el-button>
              <el-button type="primary" @click="rejecetForm('ruleForm')" :loading="rejectLoading">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            :visible.sync="toDraftsVisible"
            width="20%"
            >
            <span>确定暂存办理?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="toDraftsVisible = false">取 消</el-button>
              <el-button type="primary" @click="toDrafts" :loading="rejectLoading">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="查看办理情况"
            :visible.sync="handlingSituationVisible"
            width="70%"
            >
            <HandlingSituation :data="handlingSituation"/>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="toDraftsVisible = false">取 消</el-button>
              <el-button type="primary" @click="toDrafts" :loading="rejectLoading">确 定</el-button>
            </span> -->
          </el-dialog>
        </el-col>
      </el-row>
      <select-form
        ref="assignerRefs"
        :data="{}"
        :actor="actor"
        @selected="selected"
      />
  </div>
</template>
<script>
import PreviewFormPanel from '@/form-design/preview-form-panel'
import flowView from '@/views/flow/onlyView'
import SelectForm from '@/views/flow/form/actorcomp/selectForm'
import HandlingSituation from '../tabList/handlingSituation'
// import moment from 'moment'
import { mapGetters } from 'vuex'
import { fetchDataList, fetchData } from '@/api/form'
import {
  findOrg,
  findUser,
  findPost,
  getFlowVar

} from '@/api/user'
export default {
  name: 'creatApproval',
  components: {
    PreviewFormPanel,
    flowView,
    SelectForm,
    HandlingSituation
  },
  data() {
    return {
      title: '回退',
      label: '回退意见',
      actor: {
        orgList: [],
        userList: [],
        postList: [],
        flowVarList: []
      },
      handlingSituation: [],
      handlingSituationVisible: false,
      rules: {
        comment: [
          { required: true, message: '请填写退回意见', trigger: 'blur' }
        ]
      },
      form: {
        comment: ''
      },
      rejectLoading: false,
      processContent: '',
      toDraftsVisible: false,
      dialogVisible: false,
      rejectVisible: false,
      frontSignVisible: false,
      loading: false,
      show: false,
      value: {},
      formData: {},
      signData: {},
      taskList: [],
      taskMoreList: [],
      doneNode: [],
      curNode: '',
      signHistory: [
        // { id: '1', value: { comment: '同意', signDateTime: new Date().getTime() - 10000, sign: sign }, name: '领导A审批' },
      ],
      signType: 'after'

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
    this.initData()
    console.log(this.$route.query)
    console.log(this.$route.params)
  },
  methods: {
    initData() {
      findOrg().then(res => {
        this.actor.orgList = res.data
      })
      findUser().then(res => {
        this.actor.userList = res.data
      })
      findPost().then(res => {
        this.actor.postList = res.data
      })
      getFlowVar().then(res => {
        this.actor.flowVarList = res.data
      })
    },
    selected(assigner) {
      console.log(assigner)
      let url = `frontSign`
      if (this.signType === 'after') {
        url = `behindSign`
      } else if (this.signType === 'counterSign') {
        url = `counterSign`
      } else if (this.signType === 'changeSign') {
        url = `changeSign`
      } else if (this.signType === 'submit') {
        url = 'executeApply'
      }

      this.signSend(url, assigner)
    },
    assignerDialog() {
      const temp = {
        userList: [],
        postList: [],
        variableList: []
      }
      this.$refs.assignerRefs.showDialogBefore(temp)
    },
    fetchData() {
      this.loading = true
      let url = 'loadCreateNew'
      if (this.$route.query.url) {
        url = this.$route.query.url
      }
      fetchDataList({ applyId: this.$route.params.id }, `/process/apply/${url}/${this.$route.params.id}`, 'POST').then(res => {
        this.show = true
        this.loading = false
        const formRole = res.data.formRole
        const value = JSON.parse(res.data.formContent)
        const formaterValue = value.elements
        formaterValue.forEach((val, i) => {
          formRole.forEach((el, index) => {
            if (val.key === el.key) {
              val.shown = el.shown
              val.readonly = el.readonly
            }
          })
        })
        // console.log(value)
        this.value = value
        this.formData = res.data.formData && JSON.parse(res.data.formData) || {}
        this.processContent = res.data.processContent || ''
        this.doneNode = res.data.doneNode || []
        this.curNode = res.data.taskEntity.runtimeNode || ''
        const arr = res.data.taskEntity.taskButtons.filter(item => item.btnId === 'submitTask' || item.btnId === 'rejectTask' || item.btnId === 'toDrafts' || item.btnId === 'viewFlowChart' || item.btnId === 'viewHistoryTask')
        const arr1 = res.data.taskEntity.taskButtons.filter(item => item.btnId === 'frontSign' || item.btnId === 'behindSign' || item.btnId === 'counterSign' || item.btnId === 'ccTask')
        this.taskList = arr
        this.taskMoreList = arr1
      }).catch(err => {
        console.log(err)
      })
    },
    confirm(val) {
      if (val === 'submitTask') {
        this.$refs['designForm'].validate(valid => {
          const params = {}
          if (this.$route.query.url) {
            params.taskId = this.$route.params.id
          } else {
            params.applyId = this.$route.params.id
          }
          params.formData = this.formData
          if (valid) {
            console.log(params)
            fetchDataList(params, `/process/apply/executeApply`, 'POST').then(res => {
              this.$message({
                message: '办理成功',
                type: 'success'
              })
              this.$router.push('/processCenter/index')
              console.log(res)
            }).catch(err => {
              if (err.code === 2222) {
                this.signType = 'submit'
                this.$nextTick(() => {
                  this.assignerDialog()
                })

                console.log(err)
              }
            })
          }
        })
      } else if (val === 'viewFlowChart') {
        this.dialogVisible = true
      } else if (val === 'back') {
        // this.$router.push('/processCenter/index')
        this.$router.go(-1)
      } else if (val === 'rejectTask') {
        this.title = '回退'
        this.label = '回退意见'
        this.signType === 'back'
        this.rejectVisible = true
      } else if (val === 'toDrafts') {
        this.toDraftsVisible = true
      } else if (val === 'frontSign') {
        this.form.comment = ''
        this.title = '前加签'
        this.label = '加签意见'
        this.signType = 'before'
        this.rejectVisible = true
        // this.assignerDialog()
      } else if (val === 'behindSign') {
        this.form.comment = ''
        this.title = '后加签'
        this.label = '加签意见'
        this.signType = 'after'
        this.rejectVisible = true
      } else if (val === 'counterSign') {
        this.form.comment = ''
        this.title = '加并行会签'
        this.label = '加签意见'
        this.signType = 'counterSign'
        this.rejectVisible = true
      } else if (val === 'changeSign') {
        this.form.comment = ''
        this.title = '改签'
        this.label = '改签意见'
        this.signType = 'changeSign'
        this.rejectVisible = true
      } else if (val === 'viewHistoryTask') {
        fetchData({}, `/process/apply/getHistoryTask/${this.$route.params.id}`, 'POST').then(res => {
          this.handlingSituationVisible = true
          console.log(res)
          this.handlingSituation = res.data
        }).catch(err => {
          console.log(err)
        })
        // alert(111)
      }
    },
    // 暂存办理
    toDrafts() {
      const that = this
      this.rejectLoading = true
      fetchDataList({ taskId: that.$route.params.id, formData: that.formData }, `/process/apply/toDrafts`, 'POST').then(res => {
        that.$message({
          message: '暂存办理成功',
          type: 'success'
        })
        this.rejectLoading = false
        that.toDraftsVisible = false
      }).catch(err => {
        console.log(err)
        that.toDraftsVisible = false
        this.rejectLoading = false
      })
    },
    // 回退办理
    rejecetForm(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.rejectLoading = true
          if (this.signType === 'before' || this.signType === 'after' || this.signType === 'counterSign' || this.signType === 'changeSign') {
            this.assignerDialog()
          } else {
            fetchDataList({ taskId: that.$route.params.id, comment: that.form.comment }, `/process/apply/rejectTask`, 'POST').then(res => {
              that.$message({
                message: '回退成功',
                type: 'success'
              })
              this.rejectLoading = false
              that.rejectVisible = false
            }).catch(err => {
              console.log(err)
              that.rejectVisible = false
              this.rejectLoading = false
            })
          }
        } else {
          // that.rejectVisible = false
          this.rejectLoading = false
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 前加签
    frontSign() {
      this.signType = 'before'
      this.assignerDialog()
      this.rejectLoading = true
    },
    signSend(url, assigner) {
      if (url === 'executeApply') {
        debugger
        const params = {}
        if (this.$route.query.url) {
          params.taskId = this.$route.params.id
        } else {
          params.applyId = this.$route.params.id
        }
        params.formData = this.formData
        params.assigner = assigner
        fetchDataList(params, `/process/apply/${url}`, 'POST').then(res => {
          this.$message({
            message: '办理成功',
            type: 'success'
          })
          debugger
          this.rejectVisible = false
          this.rejectLoading = false
          if (this.signType === 'before' || this.signType === 'changeSign') {
            this.$router.go(-1)
          }
        // this.toDraftsVisible = false
        }).catch(err => {
          console.log(err)
          this.rejectVisible = false
          this.rejectLoading = false
        // this.toDraftsVisible = false
        // this.rejectLoading = false
        })
      } else {
        fetchDataList({ taskId: this.$route.params.id, assigner, comment: this.form.comment }, `/process/apply/${url}`, 'POST').then(res => {
          this.$message({
            message: '加签成功',
            type: 'success'
          })
          debugger
          this.rejectVisible = false
          this.rejectLoading = false
          if (this.signType === 'before' || this.signType === 'changeSign') {
            this.$router.go(-1)
          }
        // this.toDraftsVisible = false
        }).catch(err => {
          console.log(err)
          this.rejectVisible = false
          this.rejectLoading = false
        // this.toDraftsVisible = false
        // this.rejectLoading = false
        })
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
    },
    handleClose() {
      this.dialogVisible = false
      this.rejectVisible = false
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


