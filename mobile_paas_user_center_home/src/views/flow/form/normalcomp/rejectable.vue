<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox
          v-model="enableBack"
          :true-label="1"
          :false-label="0"
          @change="changeEnableBack"
        >充许回退操作</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-radio-group
          v-model="onRejectable"
          :disabled="enableBack === 0"
          size="mini"
          @change="changeOnRejectable"
        >
          <el-radio label="toPrevious">上一节点</el-radio>
          <el-radio label="toAny">已办理任意节点</el-radio>
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
      enableBack: 0,
      model: null,
      onRejectable: 'toPrevious'
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
        !this.model.rejectable &&
        Object.prototype.toString.call(this.model.rejectable) ===
          '[object Undefined]'
      ) {
        this.model.rejectable = true
      }
      this.enableBack = this.model.rejectable ? 1 : 0
      if (this.model.rejectable) {
        if (!this.model.onRejectable) {
          this.model.onRejectable = 'toPrevious'
        }
        this.onRejectable = this.model.onRejectable
      }
    },

    changeEnableBack(val) {
      this.model.rejectable = val === 1
    },
    changeOnRejectable(val) {
      this.model.onRejectable = val
    }
  }
}
</script>
