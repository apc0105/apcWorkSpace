/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * 高级查询按钮调用 superQuery方法  高级查询组件ref定义为superQueryModal
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 */
// import { filterObj } from '@/utils/util';
// import { deleteAction, getAction,downFile } from '@/api/manage'
// import Vue from 'vue'
// import { ACCESS_TOKEN } from "@/store/mutation-types"
import { getAction, postAction } from '@/api/manage'
import NodeComp from '@/views/flow/form/nodecomp'
import addForm from '@/components/form/add'
import SelectForm from '@/views/flow/form/actorcomp/selectForm'
import HandlingSituation from '@/views/fault/fault/handlingSituation'
// import { transformToTreeFormat } from '@/utils/calc'
// import SelectForm from '@/views/flow/form/actorcomp/selectForm'
// import {
//   findOrg,
//   findUser,
//   findPost,
//   getFlowVar

// } from '@/api/user'
export const FlowMixin = {
  data () {
    return {
      taskList: [
        {
          'btnId': 'submitTask',
          'btnName': '提交办理',
          'btnUrl': '/process/instance/doTask/{taskId}'
        },
        {
          'btnId': 'rejectTask',
          'btnName': '回退',
          'btnUrl': '/process/instance/doTask/{taskId}'
        },
        {
          'btnId': 'viewFlowChart',
          'btnName': '查看流程',
          'btnUrl': '/process/instance/viewFlowChart/{taskId}'
        },
        {
          'btnId': 'viewHistoryTask',
          'btnName': '查看办理情况',
          'btnUrl': '/process/instance/viewHistoryTask/{taskId}'
        }
      ],
      taskMoreList: [],
      handlingSituation: [],
      commentVisible: false,
      selectUserVisible: false,
      nodeVisible: false,
      taskId: '',
      projectId: '',
      orgAnduserList: [],
      // handlingSituation: [],
      // downloadUrl,
      // uploadUrl,
      processId: '',
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
      // handlingSituation: [],
      uploadVisible: false,
      handlingSituationVisible: false,
      handlingSelectUserVisible: false,
      checkedUser: [],
      userFormatList: [],
      selectUserList: [],
      form: {
        comment: ''
      },
      historyTaskVisible: false,
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
      comment: {},

      doneNode: [],
      curNode: '',
      signHistory: [
        // { id: '1', value: { comment: '同意', signDateTime: new Date().getTime() - 10000, sign: sign }, name: '领导A审批' },
      ],
      submitUrl: '/project/ramsProjectTaskInstance/projectHandle/',
      frontVo: {},
      signType: 'after'
    }
  },
  components: {
    addForm,
    NodeComp,
    SelectForm,
    HandlingSituation
  },
  created () {
    this.initData()
    this.dialogVisible = false
    this.commentVisible = false
    this.rejectVisible = false
    this.handlingSituationVisible = false
    this.handlingSelectUserVisible = false

    // this.loadData();
    // 初始化字典配置 在自己页面定义
    // this.initDictConfig();
  },
  methods: {
    //详情页获取流程详情
    processDetail (id) {
      getAction(`/engine/process/loadProcessDetailByNoTodo/${id}`, {
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.processContent = res.data.processContent || ''
          this.taskId = res.data.taskId ?res.data.taskId:''
          this.doneNode = res.data.doneNode || []
          this.curNode = res.data.taskEntity.runtimeNode
        }
      })
    },
    // 提交页面获取流程详情
    fetchProjectHandleBtn (id) {
      // debugger
      // let url = 'loadCreateNew'
      // if (this.$route.query.url) {
      //   url = this.$route.query.url
      // }
      postAction(`/engine/process/processInstance/${id}`, {
      }).then(res => {
        // debugger
        console.log(res)
        if (res.data) {
          this.processContent = res.data.processContent || ''
          this.taskId = res.data.taskId
          this.doneNode = res.data.doneNode || []
          this.curNode = res.data.taskEntity.runtimeNode
          // this.projectId = res.data.id
          // const value = res.result && res.result.formContent ? JSON.parse(res.result.formContent) : ''
          // this.taskId = res.result.taskId
          // this.processId = res.result.taskEntity.processId
          // this.historyTaskId = res.result.id
          // this.value = value
          // this.formData = res.result.formData && JSON.parse(res.result.formData) || {}

          // this.doneNode = res.result.doneNode || []
          // this.curNode = res.result.taskEntity.runtimeNode || ''
          // if (this.$route.query.url) {
          //   this.ruleForm.name = res.result.name
          // } else {
          //   this.ruleForm.name = ''
          // }
          // // this.ruleForm.name = res.result.name
          // this.ruleForm.applyNo = res.result.applyNo || '666'
          // this.formContent = res.result.formContent
          // this.attachments = res.result.attachments
        }
      })
    },
    //

    initData () {
      getAction('/engine/process/listDepartAndUser', {}).then(res => {
        this.actor.userList = res.data

        // this.actor.userList = res.data
        // this.actor.orgList = res.data
      })
      getAction('/engine/process/listDepartment', {}).then(res => {
        this.actor.orgList = res.data

        // this.actor.userList = res.data
        // this.actor.orgList = res.data
      })
      // findOrg().then(res => {
      //   this.actor.orgList = res.data
      // })
      // findUser().then(res => {
      //   console.log(res)
      //   this.actor.userList = res.data
      // })
      // findPost().then(res => {
      //   this.actor.postList = res.data
      // })
      // getFlowVar().then(res => {
      //   this.actor.flowVarList = res.data
      // })
    },
    assignerDialog () {
      const temp = {
        userList: [],
        postList: [],
        variableList: []
      }
      this.$refs.assignerRefs.showDialogBefore(temp)
    },
    // 操作办理
    operation () {
      // const params = {
      //   assigner:this.frontVo.assigner
      // }JSON.parse(JSON.stringify(this.frontVo))
      // params.assigner = {
      //   userList: this.frontVo.assigner
      // }
      postAction(`/engine/workFault/projectHandle/${this.record.id}`, this.frontVo).then(res => {
        this.checkedUser = []
        if (res.retCode === 200) {
          this.$message.success(res.message)
          this.handlingSelectUserVisible = false
          // this.$router.go(-1)
          this.$refs['nodeCompRefs'].changeDialogState(false)
        }
      })
    },
    changeAddFormModal (params, action, values) {
      console.log(params, action, values)

      // this.frontVo.projectId = this.record.id
      if (action === 'add') {
        this.frontVo = values
        this.frontVo.taskId = this.taskId
        console.log(this.title)
        if (this.title === 'rejectTask') {
          postAction(`/engine/process/rejectTask`, this.frontVo).then(res => {
            this.$message.success(res.message)
            this.commentVisible = false
            // this.$router.go(-1)
          })
        } else if (this.title === 'counterSign' || this.title === 'behindSign' || this.title === 'changeSign' || this.title === 'frontSign') {
          this.assignerDialog()
        } else {
          this.frontVo = values
          this.frontVo.taskId = this.taskId
          console.log(params, action, values)
          postAction(`/engine/workFault/projectHandle/${this.record.id}`, this.frontVo).then(res => {
            console.log(res)
            this.$message.success(res.message)
            this.commentVisible = params
            if (res.code === 200) {
              let msg = '办理成功'
              if (res.message) {
                msg = res.message
              }
              this.$message.success(msg)
              this.$router.go(-1)
            } else if (res.code === 445) { /// / 二次人员选定
              this.userFormatList = res.result.map(item => ({ name: item.name, id: item.id }))
              this.selectUserList = res.result.map(item => item.name)
              this.handlingSelectUserVisible = true
            } else if (res.retCode === 444) {
              // this.selectUserVisible = true
              this.assignerDialog()
              // debugger
              // this.assignerDialog()
            } else if (res.retCode === 446) {
              // 下一节点处理人
              res.data.forEach(item => {
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
              this.e446Data = res.data
              console.log(res.data)
              this.$refs['nodeCompRefs'].changeDialogState(true)
            }
            // this.getDataList()
          })
        }
      } else {
        this.commentVisible = false
      }
    },
    // 445多选框
    handleCheckedCitiesChange (val) {
      this.checkedUser = val
    },
    // 445提交办理
    submit () {
      const userList = []
      const arr = this.userFormatList
      const checkedList = this.checkedUser
      // console.log(arr)
      arr.forEach(item => {
        checkedList.forEach(val => {
          if (item.name === val) {
            userList.push(item)
          }
        })
      })
      console.log(userList)
      this.frontVo.assignByRange = { userList }
      this.operation()
      // postAction(`${this.submitUrl}${this.$route.query.id}`,this.frontVo).then(res=>{
      //   this.checkedUser =[]
      //   if(res.code === 200){
      //     this.handlingSelectUserVisible = false
      //   }
      // })
    },
    // 444提交办理
    selected (assigner) {
      // debugger
      console.log(assigner)
      this.frontVo.assigner = assigner
      postAction(`/engine/workFault/projectHandle/${this.record.id}`, this.frontVo).then(res => {
        console.log(res)
        if (res.retCode === 200) {
          this.$message.success('办理成功')
          this.visible = false
          this.$emit('getList')
        }
      })
      // if (this.title === 'counterSign') {
      //   // console.log(assigner)
      //   this.frontVo = { assigner, comment: this.comment.comment, taskId: this.taskId }
      //   postAction(`/project/ramsProjectTaskInstance/counterSign`, this.frontVo).then(res => {
      //     this.comment = ''
      //     this.checkedUser = []
      //     if (res.code === 200) {
      //       this.$message.success(res.message)
      //       this.handlingSelectUserVisible = false
      //       this.$router.go(-1)
      //     }
      //   })
      // } else if (this.title === 'frontSign') {
      //   // console.log(assigner)
      //   this.frontVo = { assigner, comment: this.comment.comment, taskId: this.taskId }
      //   postAction(`/project/ramsProjectTaskInstance/frontSign`, this.frontVo).then(res => {
      //     this.comment = ''
      //     this.checkedUser = []
      //     if (res.code === 200) {
      //       this.$message.success(res.message)
      //       this.handlingSelectUserVisible = false
      //       this.$router.go(-1)
      //     }
      //   })
      // } else if (this.title === 'behindSign') {
      //   // console.log(assigner)
      //   this.frontVo = { assigner, comment: this.comment.comment, taskId: this.taskId }
      //   postAction(`/project/ramsProjectTaskInstance/behindSign`, this.frontVo).then(res => {
      //     this.comment = ''
      //     this.checkedUser = []
      //     if (res.code === 200) {
      //       this.$message.success(res.message)
      //       this.handlingSelectUserVisible = false
      //       this.$router.go(-1)
      //     }
      //   })
      // } else if (this.title === 'changeSign') {
      //   // console.log(assigner)
      //   this.frontVo = { assigner, comment: this.comment.comment, taskId: this.taskId }
      //   postAction(`/project/ramsProjectTaskInstance/changeSign`, this.frontVo).then(res => {
      //     this.comment = ''
      //     this.checkedUser = []
      //     if (res.code === 200) {
      //       this.$message.success(res.message)
      //       this.handlingSelectUserVisible = false
      //       this.$router.go(-1)
      //     }
      //   })
      // } else {
      //   console.log(assigner)
      //   this.frontVo = { assigner }
      //   this.operation()
      // }

      // let url = `frontSign`

      // this.signSend(url, assigner)
    },
    // 446提交办理
    handle466Select (val) {
      console.log(val)
      // if (!val.length) {
      //   this.$message.error('请选择下一环节节点')
      //   return
      // }
      // for (let i = 0; i < val.length; i++) {
      //   if (!val[i].isAssigner) {
      //     this.$message.error(`【${val[i].name}】节点请选择执行人`)
      //     return
      //   }
      // }
      // debugger
      this.frontVo.toNodeList = [val]
      this.operation()
      // this.signSend('executeApply', val, '446')
      // TODO submit
    },
    confirm (val) {
      console.log(val)
      this.title = val
      if (val === 'submitTask') {
        this.commentVisible = true
      } else if (val === 'viewFlowChart') {
        this.dialogVisible = true
      } else if (val === 'back') {
        // this.$router.push('/processCenter/index')
        this.$router.go(-1)
      } else if (val === 'rejectTask') {
        this.commentVisible = true
      } else if (val === 'toDrafts') {
        postAction(`/project/ramsProjectTaskInstance/toDrafts`, {
          taskId: this.taskId
        }).then(res => {
          // console.log(res)
          this.$message.success(res.message)
          this.commentVisible = false
          this.visible = false
          this.$emit('getList')
          this.$router.go(-1)
        })
      } else if (val === 'frontSign') {
        this.commentVisible = true
        // this.form.comment = ''
        // this.title = '前加签'
        // this.label = '加签意见'
        // this.signType = 'before'
        // this.form.comment = ''
        // this.rejectVisible = true
        // this.rejectLoading = false
        // this.assignerDialog()
      } else if (val === 'counterSign') {
        this.commentVisible = true
      } else if (val === 'behindSign') {
        this.commentVisible = true
        // this.form.comment = ''
        // this.title = '后加签'
        // this.label = '加签意见'
        // this.signType = 'after'
        // this.rejectVisible = true
        // this.rejectLoading = false
        // this.form.comment = ''
      } else if (val === 'changeSign') {
        this.commentVisible = true
      } else if (val === 'viewHistoryTask') {
        getAction(`/engine/process/listTask/${this.record.processId}`, {}).then(res => {
          this.handlingSituationVisible = true
          this.handlingSituation = res.data
        }).catch(err => {
          console.log(err)
        })
        // alert(111)
      } else if (val === 'upload') {
        // alert(111)
        // this.uploadVisible = true
      }
    },
    handleClose () {
      this.dialogVisible = false
      this.commentVisible = false
      this.rejectVisible = false
      this.handlingSituationVisible = false
      this.handlingSelectUserVisible = false
    }
  }

}
