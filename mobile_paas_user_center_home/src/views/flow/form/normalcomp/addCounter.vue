<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox v-model="sign" :true-label="1" :false-label="0" @change="changeSign">可加签</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-checkbox-group v-model="signList" :disabled="sign===0" @change="signChangeList">
          <el-checkbox label="front">前加签</el-checkbox>
          <el-checkbox label="behind">后加签</el-checkbox>
          <el-checkbox label="counter">会签</el-checkbox>
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
      model: {},
      signList: [],
      sign: 0
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
      //
      if (
        !this.model.addSignable &&
        Object.prototype.toString.call(this.model.addSignable) ===
          '[object Undefined]'
      ) {
        this.model.addSignable = true
      }
      this.sign = this.model.addSignable ? 1 : 0

      if (this.model.addSignable) {
        if (this.model.addSignableList) {
          this.signList = this.model.addSignableList
        } else {
          this.signList = ['counter']
        }
        this.model.addSignableList = this.signList
      }
    },

    changeSign(val) {
      this.model.addSignable = val === 1
    },

    signChangeList(val) {
      this.model.addSignableList = val
    }
  }
}
</script>
