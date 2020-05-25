<template>
  <div class="card-list" ref="content">
    <div class="classify" v-for="classify in data" :key="classify.id">
      <div class="title">
        <div class="titleIcon"><icon-font type="icon-contract " /></div>
        <div class="text">{{classify.name}}</div>
      </div>
      <div class="list">
        <a-row :gutter="20">
            <a-col :xs="2" :sm="6" :md="4" :lg="4" :xl="4" v-for="item in classify.applyFormList" :key="item.id">
              <a-card :hoverable="true" >
                <a-card-meta>
                  <div style="margin-bottom: 3px;text-align:center;font-size:14px" slot="title">
                    <div>
                      <icon-font type="icon-contract" />
                    </div>
                    <div style="margin-top:15px;">
                        {{ item.name }}
                    </div>
                  </div>
                </a-card-meta>
                <template class="ant-card-actions" slot="actions">
                  <a>修改</a>
                  <a>删除</a>
                  <a-tooltip placement="bottomRight">
                    <template slot="title">
                      <p @click="handleMenu(btn.method,item.id)" v-for="btn in menuList" :key="btn.val">{{btn.val}}</p>
                    </template>
                    <a>...</a>
                  </a-tooltip>
                </template>
              </a-card>
            </a-col>
        </a-row>
      </div>
    </div>
    <edit-flow :addVisible="addVisible" :modalLoading="modalLoading" @changeAddFormModal="changeAddFormModal"></edit-flow>
    <view-flow :addVisible="viewFlowVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeAddFormModal"></view-flow>
    <edit-form :addVisible="editFormVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeAddFormModal"></edit-form>
    
    <!-- <view-form :addVisible="viewFormVisible" :modalLoading="viewmodalLoading" @changeAddFormModal="changeAddFormModal"></view-form> -->
  </div>
</template>

<script>
  
  import { Icon } from 'ant-design-vue';
  import editFlow from './flow/edit'
  import viewFlow from './flow/view'
  import editForm from './form/edit'
  import viewForm from './form/view'
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1392883_vv3fuhm6vbt.js',
  });
  export default {
    name: "CardList",
    data () {
      return {
        addVisible:false,
        modalLoading:false,
        viewFlowVisible:false,
        viewmodalLoading:false,
        editFormVisible:false,
        menuList:[
          {val:'编辑流程',method:'editFlow'},
          {val:'编辑表单',method:'editForm'},
          // {val:'查看流程',method:'viewFlow'},
          // {val:'查看表单',method:'viewForm'},
          {val:'发布',method:'release'},
        ],
        data:[
            {
              id:"1168770565020844032",
              name:"市县申报流程",
              icon:"hr",
              applyFormList:[
                  {
                      id:"11781556378554855952",
                      name:"投资审批评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"1178155637855485952",
                      name:"初设概算评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"11781556378554885952",
                      name:"投资评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"11781556378554485952",
                      name:"远其他审批工作流程程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
            ]
           },
           {
              id:"1168770565020844033",
              name:"市州申报流程",
              icon:"hr",
              applyFormList:[
                 {
                      id:"1178155637855478855952",
                      name:"投资审批评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"117815563785590485952",
                      name:"初设概算评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"1178155786378554885952",
                      name:"投资评审工作流程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
                  {
                      id:"117581556378554485952",
                      name:"  其他审批工作流程程",
                      categoryId:"1168770565020844032",
                      modelId:"1181058718586896384",
                      templateId:"1181058289723506688",
                      createTime:"1569729167795",
                      updateTime:"1570421369748",
                      lastModifier:"-7604102372010370599",
                      state:"0",
                      delFlag:"1",
                      startTypes:7,
                      noType:"0",
                      sort:-1
                  },
            ]
           },
           {
              id:"116877056502082344033",
              name:"省发改流程",
              icon:"hr",
              applyFormList:[
                {
                    id:"1174617217933770752",
                    name:"项目审核流程",
                    categoryId:"116877tre0565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721793377075hg8",
                    name:"审核会签流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721793d3377075hg8",
                    name:"项目批复流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721793d3377075hg856",
                    name:"投资计划流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                }
            ]
           },
           {
              id:"1168770565026360844033",
              name:"评审中心流程",
              icon:"hr",
              applyFormList:[
                {
                    id:"117461721793377034752",
                    name:"项目任务管理流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721fdsf793dd3770758",
                    name:"项目评审流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721fdsf7933770758",
                    name:"评审绩效流程",
                    categoryId:"116877056502f0844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721fdsf79337707gdf58",
                    name:"合评审报告流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                },
                {
                    id:"117461721fidsf79337707gdf58",
                    name:"其他流程",
                    categoryId:"1168770565020844032",
                    modelId:"1181058718586896384",
                    templateId:"1181058289723506688",
                    createTime:"1569729167795",
                    updateTime:"1570421369748",
                    lastModifier:"-7604102372010370599",
                    state:"0",
                    delFlag:"1",
                    startTypes:7,
                    noType:"0",
                    sort:-1
                }
            ]
           }
        ]
      }
    },
    components: {
      IconFont,
      editFlow,
      viewFlow,
      editForm,
      viewForm
    },
    methods: {
      handleMenu(val,id) {
        if(val === 'editFlow'){
          this.addVisible = true
          // this.$router.push(`/processCenter/flow/edit/${id}`)
          return
        } 
        if(val=== 'editForm'){
          this.editFormVisible = true
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
      changeAddFormModal(params,action,vart,values){
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
            this.addVisible = params
            return true
          } 
          this.addVisible = params
          return
        }
        if(vart === 'editForm'){
          if(action==='add'){
            this.editFormVisible = params
            return true
          } 
          this.editFormVisible = params
          return
        }
      }
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
      height: 40px;
      border-bottom: 1px #e5e5e5 solid;
      display: flex;
      justify-content: flex-start;
      align-items: center;
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
      .text{
        font-size: 14px;
        padding-left: 5px;
      }
    }
    .list{
      margin: 10px 10px;
      
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