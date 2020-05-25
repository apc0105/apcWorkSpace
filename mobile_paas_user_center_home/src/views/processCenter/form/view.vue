<template>
  <div class="dashboard-editor-container" :style=" value && value.config && value.config.formWidth !=='800px'?style1700:style1300">
    <el-row
      class="main"
      style="background:#f9f9f9;padding:16px 16px;margin-top:15px; margin-bottom:12px;;min-height:calc(100vh - 90px);overflow-x:auto"
      v-loading="loading"
      :gutter="20"
    >
      <el-col :xs="24" :sm="24" :lg="24" class="formBox">
        <div class="operation">
          <el-button-group>
            <el-button @click="confirm('back')" type="primary" size="small">返回</el-button>
            <el-button type="primary" size="small" v-print="printObj" prop-title>打印</el-button>
            <el-button type="primary" @click="confirm('upload')" size="small" >添加附件</el-button>
            <el-button 
              v-for="item in taskList"
              @click="confirm(item.btnId)"
              :key="item.btnName"
              type="primary"
              size="small"
            >{{item.btnName}}</el-button>
            <el-dropdown v-if="taskMoreList.length">
              <el-button type="primary" size="small" split-button>更多...</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in taskMoreList"
                  @click.native="confirm(item.btnId)"
                  :key="item.btnName"
                >{{item.btnName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button-group>
        </div>
        <div class="attachments">
          <div class="item" v-for="(item,index) in attachments" :key="item.id" :href="item.url">
            <svg-icon icon-class="qbz" class="PosQBZ" style="margin-right:10px" />{{item.name}}
            <a :href="`${downloadUrl}${item.url}`">下载</a>
            <span @click="handlePreview(`${downloadUrl}${item.url}`)">预览</span>
          </div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
          <div class="number demo-input-suffix">
              <el-form-item label="编号" prop="applyNo">
                <el-input
                  disabled
                  v-model="ruleForm.applyNo"
                  placeholder="请输入编号">
                </el-input>
              </el-form-item>
            </div>
          <div class="title" style="width:800px;margin:0 auto;border-bottom:2px #3088fc solid; margin-top:30px">
            <svg-icon icon-class="qbz" class="PosQBZ" />
            <el-form-item label-width="50" prop="name">
              <el-input  
              v-model="ruleForm.name" 
              placeholder="请输入标题"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <PreviewFormPanel
          style="padding:10px;border-radius:8px;"
          v-if="show"
          :value="value"
          :formData="formData"
          ref="designForm"
          id="designForm"
        />
        <el-dialog
          title="查看流程"
          :visible.sync="dialogVisible"
          width="70%"
          :before-close="handleClose"
        >
          <flowView :processContent="processContent" :doneNode="doneNode" :curNode="curNode"></flowView>
        </el-dialog>
        <el-dialog
          :title="title"
          :visible.sync="rejectVisible"
          width="40%"
          :before-close="handleClose"
        >
          <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item :label="label" prop="comment">
              <el-input type="textarea" v-model="form.comment"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rejectVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejecetForm('ruleForm')" :loading="rejectLoading">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="toDraftsVisible" width="20%">
          <span>确定暂存办理?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="toDraftsVisible = false">取 消</el-button>
            <el-button type="primary" @click="toDrafts" :loading="rejectLoading">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="查看办理情况" :visible.sync="handlingSituationVisible" width="70%">
          <HandlingSituation :data="handlingSituation" />
        </el-dialog>
        <!-- 445 节点进行二次人员选定 -->
        <el-dialog title="请选择下一步办理人" :visible.sync="handlingSelectUserVisible" width="50%">
          <el-checkbox-group v-model="checkedUser" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item" v-for="item in selectUserList" :key="item.id"></el-checkbox>
          </el-checkbox-group>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit" :loading="rejectLoading">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 上传附件 -->
        <el-dialog title="添加附件" :visible.sync="uploadVisible" :destroy-on-close="true" :close-on-click-modal="false" width="400px">
          <Upload ref="submitUpload" @isShow="isShow" :attachments="attachments"  ></Upload>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitUpload" :loading="rejectLoading">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <select-form ref="assignerRefs" :data="{}" :actor="actor" @selected="selected" />
    <node-comp ref="nodeCompRefs" :data="{}" :actor="actor" @selected="selected" :assigner-list="e446Data" @handleOk="handle466Select"></node-comp>
  </div>
</template>
<script>
import NodeComp from '@/views/flow/form/nodecomp'
import Upload from '../list/modules/upload'
import PreviewFormPanel from '@/form-design/preview-form-panel'
import flowView from '@/views/flow/onlyView'
import SelectForm from '@/views/flow/form/actorcomp/selectForm'
import HandlingSituation from '../list/modules/tabList/handlingSituation'
import { downloadUrl, uploadUrl } from '@/utils/upload'
// import moment from 'moment'
import { mapGetters } from 'vuex'
import { fetchDataList, fetchData } from '@/api/form'
import { findOrg, findUser, findPost, getFlowVar } from '@/api/user'
export default {
  name: 'creatApproval',
  components: {
    PreviewFormPanel,
    flowView,
    SelectForm,
    HandlingSituation,
    Upload,
    NodeComp
  },
  data() {
    return {
      downloadUrl,
      uploadUrl,
      e446Data: [],
      formContent: '', // 后台需要字段
      attachments: [],
      ruleForm: {
        name: '',
        applyNo: '666'
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        applyNo: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '请填写退回意见', trigger: 'blur' }
        ]
      },
      style1700: { width: '1700px !important' },
      style1300: { width: '1300px !important' },
      formTitle: '',
      printObj: {
        id: 'designForm',
        popTitle: '',
        extraCss: '',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      title: '回退',
      label: '回退意见',
      actor: {
        orgList: [],
        userList: [],
        postList: [],
        flowVarList: []
      },
      handlingSituation: [],
      uploadVisible: false,
      handlingSituationVisible: false,
      handlingSelectUserVisible: false,
      checkedUser: [],
      userFormatList: [],
      selectUserList: [],
      form: {
        comment: ''
      },
      historyTaskId: '',
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
    ...mapGetters(['code', 'orgCode'])
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
    handle466Select(val) {
      if (!val.length) {
        this.$message.error('请选择下一环节节点')
        return
      }
      for (let i = 0; i < val.length; i++) {
        if (!val[i].isAssigner) {
          this.$message.error(`【${val[i].name}】节点请选择执行人`)
          return
        }
      }
      this.signSend('executeApply', val, '446')
      // TODO submit
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

      // /process/apply/${url}/${this.$route.params.id}
      fetchDataList({ applyId: this.$route.params.id }, `/process/apply/${url}/${this.$route.params.id}`, 'POST').then(res => {
        // console.log('===============')
        // console.log(res.data)
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
        this.historyTaskId = res.data.id
        this.value = value
        this.formData = res.data.formData && JSON.parse(res.data.formData) || {}
        this.processContent = res.data.processContent || ''
        this.doneNode = res.data.doneNode || []
        this.curNode = res.data.taskEntity.runtimeNode || ''
        const arr = res.data.taskEntity.taskButtons.filter(item => item.btnId === 'submitTask' || item.btnId === 'rejectTask' || item.btnId === 'toDrafts' || item.btnId === 'viewFlowChart' || item.btnId === 'viewHistoryTask')
        const arr1 = res.data.taskEntity.taskButtons.filter(item => item.btnId === 'frontSign' || item.btnId === 'behindSign' || item.btnId === 'counterSign' || item.btnId === 'ccTask')
        this.taskList = arr
        this.taskMoreList = arr1
        if (this.$route.query.url) {
          this.ruleForm.name = res.data.name
        } else {
          this.ruleForm.name = ''
        }
        // this.ruleForm.name = res.data.name
        this.ruleForm.applyNo = res.data.applyNo || '666'
        this.formContent = res.data.formContent
        this.attachments = res.data.attachments
      })
    },
    // 445多选框
    handleCheckedCitiesChange(val) {
      this.checkedUser = val
    },
    // 445提交办理
    submit() {
      const userList = []
      const arr = this.userFormatList
      const checkedList = this.checkedUser
      console.log(arr)
      arr.forEach(item => {
        checkedList.forEach(val => {
          if (item.name === val) {
            userList.push(item)
          }
        })
      })
      console.log(userList)

      this.signSend('executeApply', { userList })
    },
    // 附件上传
    submitUpload() {
      this.$refs['submitUpload'].submitUpload()
    },
    isShow(val) {
      console.log(val)
      this.attachments = val
      this.uploadVisible = false
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
          params.name = this.ruleForm.name
          params.applyNo = this.ruleForm.applyNo
          params.attachments = this.attachments
          if (!this.$route.query.url) {
            params.formContent = this.formContent
          }

          if (valid) {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                // console.log(params)
                fetchDataList(params, `/process/apply/executeApply`, 'POST').then(res => {
                 
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.$router.push('/processCenter/list')
                  console.log(res)
                }).catch(err => {
                  if (err.code === 444) {
                    this.signType = 'submit'
                    this.assignerDialog() 
                    console.log(err)
                  } else if (err.code === 445) {
                    console.log(err)
                    this.selectUserList = err.data.map(item => item.name)
                    // this.checkedUser = err.data.map(item => item.name)
                    this.userFormatList = err.data.map(item => ({ name: item.name, id: item.id }))
                    if (err.data.length) {
                      this.handlingSelectUserVisible = true
                    } else {
                      this.assignerDialog()
                    }

                    // alert(err.code)
                  } else if (err.code === 446) {
                    err.data.forEach(item => {
                      item.value = false
                      item.assigner.userList.forEach(it => {
                        if (!it.canAssignByRange) {
                          it.value = false
                        } else {
                          it.value = true
                        }
                      })
                      item.assigner.postList = []
                      item.assigner.variableList = []
                    })
                    this.e446Data = err.data
                    this.$refs['nodeCompRefs'].changeDialogState(true)
                  }
                })
              } else {
                console.log('error submit!!')
                return false
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
        this.signType = 'back'
        this.rejectVisible = true
        this.rejectLoading = false
      } else if (val === 'toDrafts') {
        this.toDraftsVisible = true
      } else if (val === 'frontSign') {
        this.form.comment = ''
        this.title = '前加签'
        this.label = '加签意见'
        this.signType = 'before'
        this.form.comment = ''
        this.rejectVisible = true
        this.rejectLoading = false
        // this.assignerDialog()
      } else if (val === 'behindSign') {
        this.form.comment = ''
        this.title = '后加签'
        this.label = '加签意见'
        this.signType = 'after'
        this.rejectVisible = true
        this.rejectLoading = false
        this.form.comment = ''
      } else if (val === 'counterSign') {
        this.form.comment = ''
        this.title = '加并行会签'
        this.label = '加签意见'
        this.signType = 'counterSign'
        this.rejectVisible = true
        this.form.comment = ''
        this.rejectLoading = false
      } else if (val === 'changeSign') {
        this.form.comment = ''
        this.title = '改签'
        this.label = '改签意见'
        this.signType = 'changeSign'
        this.rejectVisible = true
        this.form.comment = ''
        this.rejectLoading = false
      } else if (val === 'viewHistoryTask') {
        fetchData({}, `/process/apply/getHistoryTask/${this.historyTaskId}`, 'POST').then(res => {
          this.handlingSituationVisible = true
          // console.log(res)
          this.handlingSituation = res.data
        }).catch(err => {
          console.log(err)
        })
        // alert(111)
      } else if (val === 'upload') {
        // alert(111)
        this.uploadVisible = true
      }
    },
    // 暂存办理
    toDrafts() {
      const that = this
      this.rejectLoading = true
      fetchDataList(
        { taskId: that.$route.params.id, formData: that.formData },
        `/process/apply/toDrafts`,
        'POST'
      )
        .then(res => {
          that.$message({
            message: '暂存办理成功',
            type: 'success'
          })
          this.rejectLoading = false
          that.toDraftsVisible = false
        })
        .catch(err => {
          console.log(err)
          that.toDraftsVisible = false
          this.rejectLoading = false
        })
    },
    // 回退办理
    rejecetForm(formName) {
      const that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.rejectLoading = true
          if (
            this.signType === 'before' ||
            this.signType === 'after' ||
            this.signType === 'counterSign' ||
            this.signType === 'changeSign'
          ) {
            this.assignerDialog()
          } else {
            fetchDataList(
              { taskId: that.$route.params.id, comment: that.form.comment },
              `/process/apply/rejectTask`,
              'POST'
            )
              .then(res => {
                that.$message({
                  message: '回退成功',
                  type: 'success'
                })
                this.rejectLoading = false
                that.rejectVisible = false
              })
              .catch(err => {
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
    signSend(url, assigner, state) {
      if (url === 'executeApply') {

        const params = {}
        if (this.$route.query.url) {
          params.taskId = this.$route.params.id
        } else {
          params.applyId = this.$route.params.id
        }
        params.formData = this.formData
        if (state) {
          params.toNodeList = assigner
        } else {
          params.assigner = assigner
        }
        params.name = this.ruleForm.name
        params.applyNo = this.ruleForm.applyNo
        params.attachments = this.attachments
        if (!this.$route.query.url) {
          params.formContent = this.formContent
        }
        fetchDataList(params, `/process/apply/${url}`, 'POST').then(res => {
          this.$message.success(res.message);
          this.rejectVisible = false
          this.rejectLoading = false
          this.$router.push('/processCenter/list')
          if (this.signType === 'before' || this.signType === 'changeSign') {
            this.$router.go(-1)
          }
        }).catch(err => {
          console.log(err)
          this.rejectVisible = false
          this.rejectLoading = false
        })
      } else {
        fetchDataList({ taskId: this.$route.params.id, assigner, comment: this.form.comment }, `/process/apply/${url}`, 'POST').then(res => {
          this.$message({
            message: '加签成功',
            type: 'success'
          })
          // debugger
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
    handlePreview(val) {
      window.open(`http://61.178.19.90/?furl=${val}`)
    },
    handleClose() {
      this.dialogVisible = false
      this.rejectVisible = false
    }
  }
}
</script>
<style lang="scss" >
  .title{
    .el-input__inner {
      width: 100%;
      border:none;
      height: 48px;
      line-height: 48px;
      background:#f2f2f2;
      text-align: center;
      font-size: 20px;
    }
    .el-form-item{
      margin-bottom: 0px;
    }
  }
  .number{
    .el-form-item{
      width: 100%;
    }
  }
  .formBox{
    .el-dialog__header{
      border-bottom:1px #f9f9f9 solid;
    }
    .el-dialog__body {
      padding: 10px 20px !important;
    }
    .el-dialog__footer{
      padding-bottom: 10px;
      border-top:1px #f9f9f9 solid;
    }
  }
</style>
<style lang="scss"  scoped>
.attachments{
  border-bottom:1px #e9edf1 solid;
  border-top:1px #e9edf1 solid;
  margin:25px 0;
  padding:5px 0;
  .item{
    // font-family: Simsun;
    font-size:12px;
    padding:5px 0;
    color:#3a559c;
    span{
      padding:5px;
      color:#3088fc;
      cursor: pointer;
    }
    a{
      padding:5px;
      color:#3088fc;
    }
  }
  
}
.number{
  
  position: absolute;
  right: 20px;
  top:20px;
  width: 320px;
  display:flex;
  justify-content:flex-start;
  
}
.title{
  position: relative;
  .PosQBZ{
    z-index: 999;
    position: absolute;
    top: -15px;
    right: 30px;
    font-size:40px;
    color:#3088fc;
  }
}
.operation {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  // border-bottom:1px #eeeeee solid;
  .option {
    cursor: pointer;
    padding: 10px 10px;
    &:hover {
      background: #eee;
    }
  }
}
.footer {
  text-align: center;
  margin-top: 20px;
}
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>


