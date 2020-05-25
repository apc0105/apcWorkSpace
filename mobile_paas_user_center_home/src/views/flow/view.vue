<template>
  <div class="box">
    <el-row>
      <el-col :span="18">
        <div
          id="page"
          ref="pageRef"
          class="vertical content"
          @selectstart.stop.prevent="()=>false"
        />
      </el-col>
      <el-col :span="6">
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
import G6Editor from '@antv/g6-editor'
import './register'
import '@antv/g6/build/plugin.tool.tooltip'
import DetailPannel from './detailpannel'
import {
  findOrg,
  findUser,
  findPost,
  getFlowVar,
  findApp,
  findIfs,
  findListeners,
  findInterceptor,
  findExpireHandler,
  getProcessById
} from '@/api/user'
export default {
  name: 'FlowCompentent',
  components: {
    DetailPannel
  },
  data() {
    return {
      processId: null,
      modelId: null,
      graph: null,
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
  created() {
    this.processId = this.$route.params.id
    getProcessById(this.processId).then(res => {
      if (res.code === 200 && res.data && res.data.content) {
        this.contentData = res.data.content
        this.read()
      }
    })
    this.initData()
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.editor.destroy()
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
      findApp().then(res => {
        this.appcfg.appList = res.data
      })
      findIfs().then(res => {
        this.appcfg.ifsList = res.data.content
      })
      findListeners().then(res => {
        this.eventSetting.eventList = res.data.map(item => {
          return {
            label: item.name,
            value: item.value
          }
        })
      })
      findInterceptor().then(res => {
        this.eventSetting.interceptorList = res.data.map(item => {
          return {
            label: item.name,
            value: item.value
          }
        })
      })
      findExpireHandler().then(res => {
        this.expireHandler = res.data
      })
    },
    deleteItem() {
      this.nodeId = 'canvas'
    },
    read() {
      const { props, flow } = JSON.parse(this.contentData)
      this.flow.read(flow)
      this.propsData = props
    },
    init() {
      G6Editor.track(false)
      this.editor = new G6Editor()
      this.detailpannel = new G6Editor.Detailpannel({
        container: this.$refs.detailpannelRef
      })

      const _g_cfg = {
        container: this.$refs.pageRef,
        modes: {
          default: [
            'clickEdgeSelected',
            'clickNodeSelected',
            'clickCanvasSelected',
            'clickGroupSelected',
            'wheelPanCanvas'
          ]
        },
        mode: 'default'
      }

      var cfg = {
        graph: _g_cfg,
        noEndEdge: false,
        shortcut: {
          delete: false
        }
      }
      this.flow = new G6Editor.Flow(cfg)
      // 设置边为圆角直线
      this.flow.changeAddEdgeModel({
        shape: 'flow-polyline-round'
      })
      this.graph = this.flow.getGraph()
      this.graph.setFitView('cc') // 将图相对于画布居中
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

      this.graph.on('dragstart', ev => {
        // debugger
        ev.cancel = true
      })

      this.flow.on('hovernode:beforeshowanchor', ev => {
        ev.cancel = true
      })
      // 当节点在拖动的时候，如果是它本身或是开始节点，则不能向其引边线
      this.flow.on('dragedge:beforeshowanchor', ev => {
        ev.cancel = true
      })
      this.flow.on('hoveranchor:beforeaddedge', ev => {
        // ev.anchor  锚点   // ev.item    子项
        ev.cancel = true // 若设置该锚点不会触发连接模式
      })
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
