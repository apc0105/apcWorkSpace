<template>
  <div class="card-list" ref="content">
    <div class="classify" v-for="classify in data" :key="classify.id">
      <div class="title">
        <div class="tit">
          <div class="titleIcon"><icon-font type="icon-contract " /></div>
          <div class="text">{{classify.name}}</div>
        </div>
        <a-icon type="plus" @click="handleAddItem({categoryId:classify.id})"/>
      </div>
      <div class="list">
        <a-row :gutter="20">
            <a-col :xs="2" :sm="6" :md="4" :lg="4" :xl="4" v-for="item in classify.processModelList" :key="item.id">
              <a-card :hoverable="true" >
                <a-card-meta>
                  <div style="margin-bottom: 3px;text-align:center;font-size:14px" slot="title">
                    <div>
                      <icon-font type="icon-contract" />
                    </div>
                    <div class="tit" style="margin-top:15px;">
                        {{ item.name }}
                    </div>
                  </div>
                </a-card-meta>
                <template class="ant-card-actions" slot="actions">
                  <a @click="handleAddItem(item)">修改</a>
                  <a @click="handleMenu('del',item.id)">删除</a>
                  <a-tooltip placement="bottomRight">
                    <template slot="title">
                      <p @click="handleMenu('editFlow',item)">编辑流程</p>
                      <p v-if="item.state==='1'" @click="handleMenu('viewFlow',item)">查看流程</p>
                      <!-- <p @click="handleMenu('deployModel',item)">发布</p> -->
                      <p v-if="item.state==='0'" @click="handleMenu('deployModel',item)">发布</p>
                      <p v-else @click="handleMenu('undeployModel',item)">撤销</p>
                    </template>
                    <a>...</a>
                  </a-tooltip>
                </template>
              </a-card>
            </a-col>
        </a-row>
      </div>
    </div>
    <edit-flow :flowBaseData="row" :addVisible="addFlowVisible" :modalLoading="modalLoading" @changeAddFormModal="changeFlowModal"></edit-flow>
    <!-- <view-flow :addVisible="viewFlowVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeFlowModal"></view-flow> -->
    <!-- <edit-form :addVisible="editFormVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeAddFormModal"></edit-form> -->
    <add-form 
      ref="formRefs"
      :addVisible="addVisible" 
      @changeAddFormModal="changeAddFormModal"
      :modalTitle="modalTitle"
      :modalLoading="modalLoading"
      modalWidth="40%"
      :addField="addField"
    >
    </add-form>
    <el-dialog
      title="查看流程"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <flowView :processContent="processContent" :doneNode="doneNode" :curNode="curNode"></flowView>
    </el-dialog>
    <!-- <view-form :addVisible="viewFormVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeAddFormModal"></view-form> -->
  </div>
</template>

<script>
  import flowView from '@/views/processCenter/flow/view'
  import {applicationService} from './field'
  import addForm from '@/components/form/add'
  import { Icon } from 'ant-design-vue';
  import editFlow from './flow/edit'
  import viewFlow from './flow/view'
  import editForm from './form/edit'
  import viewForm from './form/view'
  import {fetchData,delAction,postAction} from '@/api/form'
  import {} from '@/api/form'
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1392883_vv3fuhm6vbt.js',
  });
  export default {
    name: "CardList",
    data () {
      return {
        row:{},
        categoryId:'',
        addUrl: '/manage/process/saveModel',
        delUrl: '/manage/process/deleteModel',
        pageUrl: '/manage/process/findAll',
        searchUrl: '/waybill/waybill-info/scan-type-list',
        addVisible:false,
        addFlowVisible:false,
        addFlowBaseVisible:false,
        addField:[],
        default:applicationService,
        modalTitle:'新增',
        modalLoading:false,
        viewFlowVisible:false,
        viewmodalLoading:false,
        editFormVisible:false,
        data:[],
        dialogVisible: false,
        doneNode: [],
        curNode: '',
        processContent: '',
      }
            
    },
    components: {
      flowView,
      addForm,
      IconFont,
      editFlow,
      viewFlow,
      editForm,
      viewForm
    },
    created () {
      this.fetchList()
    },
    methods: {
      fetchList(){
        fetchData({},this.pageUrl,'get').then(res=>{
          console.log(res)
          this.data = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
       handleAddItem(row){
         console.log(row)
         this.categoryId = row.categoryId
        if(row.id){
          this.isEdit = true
          this.modalTitle = '修改'
          this.row = row
          let fieldArr =JSON.parse(JSON.stringify(this.default))
          // debugger
          fieldArr.forEach(item=>{
            const {decorator:[fieldName,options]} = item
            if(fieldName=== 'enableSecret'){
              options.initialValue = row[fieldName]=== '1'?true:false
            } else{
              options.initialValue = row[fieldName]
            }

          })
          this.addField = fieldArr
        } else{
          this.isEdit = false
          this.row = {}
          this.modalTitle = '新增'
          this.addField = JSON.parse(JSON.stringify(this.default))
        }
        this.addVisible = true
        
      },
      handleMenu(val,row) {
        // debugger
        if(val === 'editFlow'){
          console.log(row)
          this.row = row
          this.addFlowVisible = true
          // this.$router.push(`/processCenter/flow/edit/${id}`)
          return
        }
        if(val === 'viewFlow'){
          console.log(row.id)
          postAction({},`/manage/process/getModelById/${row.id}`).then(res=>{
            console.log(res)
             this.processContent = res.data.content?res.data.content:''
            this.dialogVisible = true
            // this.$message.success('发布成功')
            // this.fetchList()
          })
          // this.$router.push(`/processCenter/flow/edit/${id}`)
          return
        }
        
        if(val==='deployModel'){
          // debugger
          console.log(val,row)
          postAction({},`/manage/process/deployModel/${row.id}`).then(res=>{
            console.log(res)
            this.$message.success('发布成功')
            this.fetchList()
          })
        }
        if(val==='undeployModel'){
          // debugger
          console.log(val,row)
          postAction({},`/manage/process/undeployModel/${row.id}`).then(res=>{
            console.log(res)
            this.$message.success('撤销成功')
            this.fetchList()
          })
        }
        if(val=== 'del'){
          delAction(row,this.delUrl).then(res=>{
            console.log(res)
            if(res.code === 200){
              this.$message.success(res.message)
              this.fetchList()
            }
            
          })
          // this.editFormVisible = true
          // this.viewFlowVisible=true
          // this.$router.push(`/processCenter/form/edit/${id}`)
          return
        }
        if(val=== 'viewForm'){
          // this.viewFormVisible = true
          this.$router.push(`/processCenter/form/view/${id}`)
          return
        }
        if(val=== 'viewFlow'){
          this.viewFlowVisible=true
          // this.$router.push(`/processCenter/flow/view/${id}`)
          return
        }
        // this.$router.push('/processCenter/form/edit/161616')
        console.log(val)
      },
      changeFlowModal(params,action,vart,values){
        
        if(vart === 'viewFlow'){
          if(action==='add'){
            this.viewFlowVisible = params
            return true
          } 
          this.viewFlowVisible = params
          return
        }
        if(vart === 'editFlow'){
          if(action==='add'){
            this.addFlowVisible = params
            return true
          } 
          this.addFlowVisible = params
          return
        }
        
      },
      changeAddFormModal(params,action,values){
        console.log(params,action,values)
        let res = {...values,...{categoryId:this.categoryId}}
        if(action==='add'){
          if(this.row.id) res.id = this.row.id
          postAction(res,this.addUrl).then(res=>{
            console.log(res)
            this.$message.success(res.message)
            this.addVisible = params
            this.fetchList()
          })
        }else{
          this.addVisible = params
        }
      },
      // 查看流程取消
      handleClose() {
        this.dialogVisible = false
        // this.rejectVisible = false
      },  
    },
  }
</script>
<style lang="scss">
.ant-tooltip-arrow{
    border-bottom-color: #fff !important;
  }
.ant-tooltip-inner{
  background-color: #fff !important;
  color: #000;
  padding: 0;
  p{
    font-size: 14px;
    cursor: pointer;
    padding: 2px 8px;
    margin-bottom: 5px;
    color: #898989;
    &:hover{
      background-color: #f2f2f3;
    }
  }
}

</style>
<style lang="scss" scoped>
.card-list{
  background-color: #fff;
  padding:10px 10px;
}
  .classify{
    border:1px #d4d4d4 solid;
    border-radius: 5px;
    margin-bottom:10px;
    font-size: 14px;
    
    .title{
      padding:0 20px 0 0;
      height: 40px;
      border-bottom: 1px #e5e5e5 solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tit{
        display:flex;
        justify-content: flex-start;
        align-items:center;
        .titleIcon{
          display: inline-block;
          background-color: #1890ff;
          width: 40px;
          height: 100%;
          display: inline-block;
          border-top-left-radius: 5px;
          text-align: center;
          padding: 5px 5px;
          .anticon{
            svg{
              color: #fff;

            }
          }
        }
      }
      
      .text{
        font-size: 14px;
        padding-left: 5px;
      }
    }
    .list{
      margin: 10px 10px;
      .tit{
        margin-top:15px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .anticon{
      svg{
        font-size: 22px;
        color: #1890ff;
        vertical-align: middle;
      }
    }
  }
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .titilIcon{
    font-size: 28px;
    color: #1890ff;
    padding-bottom: 15px;
  }
  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 158px;
    border-color: rgb(135, 208, 104);
    .addIcon{
      font-size: 65px;
      color:#d9d9d9;
    }
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>