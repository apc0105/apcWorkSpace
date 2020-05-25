<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <div
          id="page"
          ref="pageRef"
          class="vertical content"
          @selectstart.stop.prevent="()=>false"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
import './register'
import '@antv/g6/build/plugin.tool.tooltip'
export default {
  name: 'FlowCompentent',
  props: {
    processContent: {
      type: String,
      default() {
        return null
      }
    },
    doneNode: {
      type: Array,
      default() {
        return []
      }
    },
    curNode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      processId: null,
      modelId: null,
      graph: null,
      editor: {},
      flow: {},
      tempNode: {},
      nodeId: 'canvas',
      contentData: '{}'
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  destroyed() {
    this.editor.destroy()
  },
  methods: {
    deleteItem() {
      this.nodeId = 'canvas'
    },
    read() {
      const { flow } = JSON.parse(this.processContent || {})
      this.doneNode.forEach(node => {
        const item = flow.nodes.find(it => it.id === node.id)
        if (item) {
          if (!node.isEdit) {
            item.shape = item.shape + '-pass'
          } else {
            item.shape = item.shape + '-edit'
          }
        }
      })
      // const curItem = flow.nodes.find(it => it.id === this.curNode)
      // if (curItem) {
      //   curItem.shape = curItem.shape.replace('-pass', '') + '-edit'
      // }

      this.flow.read(flow)
    },
    init() {
      G6Editor.track(false)
      this.editor = new G6Editor()

      const _g_cfg = {
        container: this.$refs.pageRef,
        modes: {
          default: [
            'panBlank',
            'clickEdgeSelected',
            'clickNodeSelected',
            'clickCanvasSelected',
            'clickGroupSelected',
            'wheelPanCanvas'
          ]
        },
        mode: 'default',
        fitView: 'autoZoom'
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
      // this.graph.setFitView('autoZoom') // 将图相对于画布居中
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
      this.read()
    }
  }
}
</script>
<style>
.box {
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
  height: calc(100vh - 54px) !important;
}
.content {
  border-right: 1px #eee solid;
  border-left: 1px #eee solid;
}
</style>
