<template>
  <div>
    <el-card v-if="model" header="结束节点" size="mini">
      <node-label :data="data" :item="item" :graph="graph" />
    </el-card>
  </div>
</template>
<script>
import NodeLabel from './components/NodeLabel'
import {elMixin} from '../el-mixin'
export default {
  name: 'EndForm',
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
      model: null
    }
  },
  watch: {
    item: function(val, oldVal) {
      if (val !== oldVal) {
        this.model = this.data.model
      }
    }
  },
  mounted() {
    this.model = this.data.model
  }
}
</script>
<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 14px;
}
</style>
