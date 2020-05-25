<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox
          v-model="timeLimit"
          :true-label="1"
          :false-label="0"
          @change="changeTimeLimit"
        >设置办理时限</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="7" class="flow-form-label">
        <el-select
          v-model="model.expireByDay"
          :disabled="timeLimit===0"
          placeholder
          size="mini"
          style="width:80%"
        >
          <el-option v-for="ops in days" :key="`expireByDay${ops}`" :label="ops" :value="ops" />
        </el-select>
      </el-col>
      <el-col :span="4" class="flow-form-label">
        <div>天</div>
      </el-col>
      <el-col :span="7" class="flow-form-label">
        <el-select
          v-model="model.expireByHour"
          :disabled="timeLimit===0"
          placeholder
          size="mini"
          style="width:80%"
        >
          <el-option v-for="ops in hours" :key="`expireByHour${ops}`" :label="ops" :value="ops" />
        </el-select>
      </el-col>
      <el-col :span="4" class="flow-form-label">
        <div>小时</div>
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
      timeLimit: 0,
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      hours: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      minites: () => {
        const arr = []
        for (let i = 1; i < 60; i++) {
          arr.push(i)
        }
        return arr
      }
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
        !this.model.expireOpera &&
        Object.prototype.toString.call(this.model.expireOpera) ===
          '[object Undefined]'
      ) {
        this.model.expireOpera = false
      }
      this.timeLimit = this.model.expireOpera ? 1 : 0

      // if (!this.model.expireByDay) {
      //   this.model.expireByDay = 0
      // }
      // if (!this.model.expireByHour) {
      //   this.model.expireByHour = 0
      // }
    },

    changeTimeLimit(val) {
      this.model.expireOpera = val === 1
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
