<template>
  <div v-if="model">
    <el-card header="决策节点" size="mini">
      <node-label :data="data" :item="item" :graph="graph" />
      <el-row style="padding-top:5px;">
        <el-col :span="24">
          <el-radio-group v-model="driveMode" size="mini" @change="driveModeChange">
            <el-radio label="auto">自动</el-radio>
            <el-radio label="handle">手动</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import NodeLabel from './components/NodeLabel'
import {elMixin} from '../el-mixin'
export default {
  name: 'DecisionForm',
  mixins:[elMixin],
  components: {
    NodeLabel
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    graph: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeName: 'setting',
      model: null,
      driveMode: 'auto'
    }
  },
  watch: {
    item: function(val, oldVal) {
      if (val !== oldVal) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.model = this.data.model
      if (!this.model.driveMode) {
        this.model.driveMode = 'auto'
      }
      this.driveMode = this.model.driveMode
    },
    driveModeChange(val) {
      this.model.driveMode = val
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
