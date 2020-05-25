<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox
          v-model="backCurrent"
          :true-label="1"
          :false-label="0"
          @change="changeBackCurrent"
        >可回退本节点</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-radio-group v-model="back" :disabled="backCurrent===0" size="mini" @change="changeBack">
          <el-radio label="allOnRejected">回退后所有人重办</el-radio>
          <el-radio label="customOnRejected">回退后可指定重办人选</el-radio>
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
      backCurrent: 0,
      model: {},
      back: ''
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
        !this.model.canBeRejected &&
        Object.prototype.toString.call(this.model.canBeRejected) ===
          '[object Undefined]'
      ) {
        this.model.canBeRejected = true
      }
      this.backCurrent = this.model.canBeRejected ? 1 : 0

      if (this.model.canBeRejected) {
        if (!this.model.back) {
          this.model.back = 'allOnRejected'
        }
        this.back = this.model.back
      }
    },

    changeBackCurrent(val) {
      this.model.canBeRejected = val === 1
    },
    changeBack(val) {
      this.model.back = val
    }
  }
}
</script>
