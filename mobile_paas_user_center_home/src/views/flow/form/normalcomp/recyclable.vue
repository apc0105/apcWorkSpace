<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox
          v-model="redoTask"
          :true-label="1"
          :false-label="0"
          @change="changeRedoTask"
        >可撤销回收任务</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-radio-group v-model="OnRecycled" :disabled="redoTask === 0" size="mini">
          <el-radio label="onlySelfOnRecycled">仅本人办理</el-radio>
          <el-radio label="AllOnRecycled">所有人重办</el-radio>
          <el-radio label="forceRecyclable">允许强制撤销</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  props: {
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
      model: {},
      redoTask: 0,
      OnRecycled: 'onlySelfOnRecycled'
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
      if (
        !this.model.recyclable &&
        Object.prototype.toString.call(this.model.recyclable) ===
          '[object Undefined]'
      ) {
        this.model.recyclable = true
      }
      this.redoTask = this.model.recyclable ? 1 : 0
      if (this.model.recyclable) {
        if (!this.model.OnRecycled) {
          this.model.OnRecycled = 'onlySelfOnRecycled'
        }
        this.OnRecycled = this.model.OnRecycled
      }
    },

    changeRedoTask(val) {
      this.model.recyclable = val === 1
    }
  }
}
</script>
