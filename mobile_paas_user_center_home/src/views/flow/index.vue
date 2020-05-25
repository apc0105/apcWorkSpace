<template>
  <div class="box" v-if="processId">
    <el-row>
      <el-col>
        <div id="toolbar" ref="toolbarRef" class="toolbar" @selectstart.stop.prevent="()=>false">
          <tool-bar
            v-if="graph"
            :editor="editor"
            :flow="flow"
            @deleteItem="deleteItem"
            @save="save"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div id="itempannel" ref="itemRef" class="vertical" @selectstart.stop.prevent="()=>false">
          <item-pannel v-if="graph" />
        </div>
      </el-col>
      <el-col :span="17">
        <div
          id="page"
          ref="pageRef"
          class="vertical content"
          @selectstart.stop.prevent="()=>false"
        />
      </el-col>
      <el-col :span="5">
        <div
          id="detailpannel"
          ref="detailpannelRef"
          class="vertical"
          @selectstart.stop.prevent="()=>false"
        >
          <detail-pannel
            v-if="graph"
            :item="nodeId"
            :graph="graph"
            :flow="flow"
            :props-data="propsData"
            :actor="actor"
            :event-setting="eventSetting"
            :appcfg="appcfg"
            :form-data-list="formDataList"
            :expire-handler="expireHandler"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {flowData} from '@/utils/mock'
import G6Editor from '@antv/g6-editor'
import './register'
import '@antv/g6/build/plugin.tool.tooltip'
import ToolBar from './toolbar'
import ItemPannel from './itempannel'
import DetailPannel from './detailpannel'
import {elMixin} from './el-mixin'
import {delAction,save} from '@/api/form'
import {
  findOrg,
  findUser,
  findPost,
  getFlowVar,
  saveProcess,
  findApp,
  findIfs,
  findListeners,
  findInterceptor,
  findExpireHandler,
  getProcessById,
  getFormAuth
} from '@/api/user'
import { constants } from 'fs';
export default {
  name: 'FlowCompentent',
  components: {
    ToolBar,
    ItemPannel,
    DetailPannel
  },
  data() {
    return {
      processId: 'test',
      graph: null,
      showDetail: false,
      toolbar: null,
      itempannel: null,
      detailpannel: null,
      editor: {},
      flow: {},
      tempNode: {},
      nodeId: 'canvas',
      eventSetting: {
        eventList: [],
        interceptorList: []
      },
      expireHandler: [],
      actor: {
        orgList: [],
        userList: [],
        postList: [],
        flowVarList: []
      },
      propsData: {
        events: {
          startEvent: [],
          pauseEvent: [],
          stopEvent: [],
          endEvent: []
        }
      },
      appcfg: {
        ifsList: [],
        appList: []
      },
      formDataList: [],
      contentData: '{props:{},flow:{}}'
    }
  },
  props: {
    flowBaseData:{
      type:Object,
      default:()=>{}
    },
  },
  created() {
    console.log(this.flowBaseData)
    console.log(flowData)
    // this.contentData = flowData.content
    this.initflowData()
       // 获取编辑流程初始化所需要的数据
      this.initData()
    
    // this.processId = this.$route.params.id
    // if (this.processId) {
    //   getProcessById(this.processId).then(res => {
    //     if (res.code === 200 && res.data && res.data.content) {
    //       this.contentData = res.data.content
    //       this.read()
    //     }
    //   })
    //   // 获取编辑流程初始化所需要的数据
    //   this.initData()
    // }
  },
  mounted() {
    this.init()
    // this.read()
    // this.initData()
  },
  destroyed() {
    this.editor.destroy()
  },
  methods: {
    initflowData(){
      delAction(this.flowBaseData.id,'/manage/process/getModelById').then(res=>{
        console.log(res)
        console.log(res.data.content)
        this.contentData = res.data.content
        this.read()
      })
    },
    initData() {
      findOrg().then(res => {
        this.actor.orgList = res.data
      })
      findUser().then(res => {
        console.log(res)
        this.actor.userList = res.data
      })
      findPost().then(res => {
        this.actor.postList = res.data
      })
      getFlowVar().then(res => {
        this.actor.flowVarList = res.data
      })
      // findApp().then(res => {
      //   this.appcfg.appList = res.data
      // })
      // findIfs().then(res => {
      //   this.appcfg.ifsList = res.data.content
      // })
      // getFormAuth(this.processId).then(res => {
      //   this.formDataList = res.data
      // })
      // findListeners().then(res => {
      //   this.eventSetting.eventList = res.data.map(item => {
      //     return {
      //       label: item.name,
      //       value: item.value
      //     }
      //   })
      // })
      // findInterceptor().then(res => {
      //   this.eventSetting.interceptorList = res.data.map(item => {
      //     return {
      //       label: item.name,
      //       value: item.value
      //     }
      //   })
      // })
      // findExpireHandler().then(res => {
      //   this.expireHandler = res.data
      // })
    },
    deleteItem() {
      this.nodeId = 'canvas'
    },
    init() {
      G6Editor.track(false)
      this.editor = new G6Editor()
      this.toolbar = new G6Editor.Toolbar({
        container: this.$refs.toolbarRef
      })
      this.itempannel = new G6Editor.Itempannel({
        container: this.$refs.itemRef
      })
      this.detailpannel = new G6Editor.Detailpannel({
        container: this.$refs.detailpannelRef
      })

      const _g_cfg = {
        container: this.$refs.pageRef,
        modes: {
          default: [
            'panBlank',
            'hoverGroupActived',
            'keydownCmdWheelZoom',
            'clickEdgeSelected',
            'clickNodeSelected',
            'clickCanvasSelected',
            'clickGroupSelected',
            'hoverNodeActived',
            'hoverEdgeActived',
            'hoverAnchorActived',
            'hoverButton',
            'clickCollapsedButton',
            'clickExpandedButton',
            'wheelPanCanvas',
            'keydownShiftMultiSelected',
            'dragNodeAddToGroup',
            'dragOutFromGroup',
            'panItem',
            'hoverEdgeControlPoint'
          ],
          add: ['dragPanelItemAddNode', 'dragAnchorAddEdge'],
          resize: ['dragEdgeControlPoint', 'hoverEdgeControlPoint'],
          readOnly: ['panCanvas'],
          move: ['panCanvas'],
          multiSelect: ['dragMultiSelect']
        },
        mode: 'default'
      }

      var cfg = {
        graph: _g_cfg,
        noEndEdge: false
      }
      this.flow = new G6Editor.Flow(cfg)
      // 设置边为圆角直线
      this.flow.changeAddEdgeModel({
        shape: 'flow-polyline-round'
      })
      this.graph = this.flow.getGraph()
      this.graph.setFitView('cc') // 将图相对于画布居中
      this.editor.add(this.toolbar)
      this.editor.add(this.itempannel)
      this.editor.add(this.detailpannel)
      this.editor.add(this.flow)
      window.flow = this.flow

      // 点击节点
      this.graph.on('node:click', ev => {
        this.nodeId = ev.item.model.id
      })
      // 点击边
      this.graph.on('edge:click', ev => {
        this.nodeId = ev.item.model.id
      })
      // 点击画布
      this.graph.on('click', ev => {
        this.nodeId = 'canvas'
      })

      this.flow.on('hovernode:beforeshowanchor', ev => {
        // 结束节点不能够引出连线
        if (ev.item.model.name === 'end') {
          ev.cancel = true
          return
        }
        // 当开始节点存在一条连线的时候，不应再引出一条边线
        if (ev.item.model.name === 'start') {
          if (ev.item.getEdges().length > 0) {
            ev.cancel = true
          }
        }
      })
      // 当节点在拖动的时候，如果是它本身或是开始节点，则不能向其引边线
      this.flow.on('dragedge:beforeshowanchor', ev => {
        if (ev.source.id === ev.target.id) {
          ev.cancel = true
          return
        }
        const node = this.flow.find(ev.target.id).model
        if (node && node.name === 'start') {
          ev.cancel = true
          return
        }
      })
      this.graph.on('afterchange', ev => {
        if (ev.action === 'add') {
          this.flow.clearSelected()
          this.nodeId = ev.model.id
          this.flow.setSelected(ev.item, true)
        }
      })
    },
    judgeNode(sourceOrtarget, nodeName) {
      const nodeId = this.data.model[sourceOrtarget]
      const node = this.flow.find(nodeId).model
      if (node.name === nodeName) {
        return true
      }
      return false
    },
    save() {
      const flowData = this.flow.save()
      if (flowData.nodes) {
        flowData.nodes.forEach(item => {
          if (item.events) {
            Object.values(item.events).forEach(it => {
              this.removeEventOptoins(it)
            })
          }
        })
      }

      const propsData = JSON.parse(JSON.stringify(this.propsData))
      Object.values(propsData.events).forEach(it => {
        this.removeEventOptoins(it)
      })
      const temp = {
        flow: flowData,
        props: this.propsData
      }
      console.log(JSON.stringify(temp))
      console.log({...this.flowBaseData,...{content:JSON.stringify(temp)}})
      save({...this.flowBaseData,...{content:JSON.stringify(temp)}},'/manage/process/saveModel','post')
      .then(res=>{
        console.log(res)
        this.$message.success(res.message)
        this.$emit('changeModalStatus',false)
      })
      // saveProcess({
      //   id: this.processId,
      //   processContent: JSON.stringify(temp)
      // })
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.$message({
      //         message: '保存成功，请关闭此页面',
      //         type: 'success'
      //       })
      //     } else {
      //       this.$message({
      //         message: res.message,
      //         type: 'error'
      //       })
      //     }
      //   })
      //   .catch(() => {
      //     this.$message({
      //       message: '服务器错误',
      //       type: 'error'
      //     })
      //   })
    },
    removeEventOptoins(eventList) {
      if (eventList) {
        eventList.forEach(item => {
          delete item.options
        })
      }
    },
    read() {
      const { props, flow } = JSON.parse(this.contentData)
      console.log(props, flow)
      this.flow.read(flow)
      this.propsData = props
    }
  }
}
</script>
<style>
.box {
  height: 100vh;
  background: #fff;
}
.toolbar {
  background: #fff;
  height: 50px;
  line-height: 50px;
  position: inherit;
  border-bottom: 1px #eee solid;
}
.vertical {
  height: calc(100vh - 54px);
}
.content {
  border-right: 1px #eee solid;
  border-left: 1px #eee solid;
}
</style>
