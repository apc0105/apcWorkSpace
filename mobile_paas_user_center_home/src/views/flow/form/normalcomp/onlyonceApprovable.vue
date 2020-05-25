<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox v-model="apply" :true-label="1" :false-label="0" @change="changeApply">连岗审批</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-checkbox-group v-model="applyList" :disabled="apply===0" @change="changeApplyList">
          <el-checkbox label="onlyonceByContinue">上节点</el-checkbox>
          <el-checkbox label="onlyonceByAll">全节点</el-checkbox>
        </el-checkbox-group>
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
      apply: 0,
      applyList: []
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
        !this.model.onlyonceApprovable &&
        Object.prototype.toString.call(this.model.onlyonceApprovable) ===
          '[object Undefined]'
      ) {
        this.model.onlyonceApprovable = false
      }
      this.apply = this.model.onlyonceApprovable ? 1 : 0

      if (this.model.OnOnlyonce) {
        this.applyList = this.model.OnOnlyonce
      } else {
        this.applyList = []
      }
    },

    changeApplyList(val) {
      this.model.OnOnlyonce = val
    },
    changeApply(val) {
      this.model.onlyonceApprovable = val === 1
    }
  }
}
</script>
