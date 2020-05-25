<template>
  <div>
    <el-card v-if="model" header="边线" size="mini">
      <el-row>
        <el-col :span="6">
          <div class="flow-form-label">边线名称</div>
        </el-col>
        <el-col :span="18">
          <el-input v-model="edgeName" placeholder="请输入节点名称" size="mini" />
        </el-col>
      </el-row>
      <div v-if="isFromDecisioni">
        <el-row style="padding-top:5px;">
          <el-col :span="6">
            <div class="flow-form-label">选择类型</div>
          </el-col>
          <el-col :span="18" style="padding:5px 0 0 0">
            <el-radio-group v-model="exprType" size="mini" @change="changeExprType">
              <el-radio label="expr">表达式</el-radio>
              <el-radio label="selectExpr">内置表达式</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-if="exprType==='expr'" style="padding-top:5px;">
          <el-col :span="6">
            <div class="flow-form-label">表达式</div>
          </el-col>
          <el-col :span="18">
            <el-input v-model="model.expr" placeholder="${form.leaveDays} < 3" size="mini" />
          </el-col>
        </el-row>
        <el-row v-if="exprType==='selectExpr'" style="padding-top:5px;">
          <el-col :span="6">
            <div class="flow-form-label">请选择</div>
          </el-col>
          <el-col :span="18">
            <el-select v-model="model.selectExpr" placeholder="请选择" size="mini" style="width:100%">
              <el-option
                v-for="ops in options"
                :key="ops.value"
                :label="ops.label"
                :value="ops.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </div>
      <el-row style="padding-top:5px;">
        <el-col :span="6">
          <div class="flow-form-label">边线类型</div>
        </el-col>
        <el-col :span="18">
          <el-button-group size="mini">
            <el-button type="primary" round size="mini" @click="changeShape('flow-polyline')">直角折线</el-button>
            <el-button type="primary" round size="mini" @click="changeShape('flow-base')">直线</el-button>
            <el-button
              type="primary"
              round
              size="mini"
              @click="changeShape('flow-polyline-round')"
            >圆角折线</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {elMixin} from '../el-mixin'
export default {
  name: 'EdgeForm',
  mixins: [elMixin],
  props: {
    graph: {
      type: Object,
      required: true
    },
    flow: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    item: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: null,
      exprType: 'expr',
      options: [],
      edgeName: ''
    }
  },
  computed: {
    isStart: function() {
      return this.judgeNode('target', 'start')
    },
    isFromDecisioni: function() {
      return this.judgeNode('source', 'decision')
    }
  },
  watch: {
    item: function(val, oldVal) {
      if (val !== oldVal) {
        this.init()
      }
    },
    edgeName: function(val) {
      this.labelChange(val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.model = this.data.model
      if (!this.model.exprType) {
        this.model.exprType = 'expr'
      }
      this.edgeName = this.model.label || ''
      this.exprType = this.model.exprType
    },
    judgeNode(sourceOrtarget, nodeName) {
      const nodeId = this.data.model[sourceOrtarget]
      const node = this.flow.find(nodeId).model
      if (node.name === nodeName) {
        return true
      }
      return false
    },
    labelChange(val) {
      this.model.label = val
      this.graph.update(this.data, {
        label: val
      })
    },
    changeExprType(val) {
      this.model.exprType = val
    },
    changeShape(val) {
      this.graph.update(this.data, {
        shape: val
      })
    }
  }
}
</script>
<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 14px;
}
</style>
