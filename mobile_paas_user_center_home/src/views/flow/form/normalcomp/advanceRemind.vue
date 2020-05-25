<template>
  <div v-if="data && data.model">
    <el-row style="padding-top:5px;">
      <el-col :span="24" class="flow-form-label">
        <el-checkbox
          v-model="expireRemind"
          :true-label="1"
          :false-label="0"
          @change="changeExpireRemind"
        >设置逾期提醒时间</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="5" class="flow-form-label">
        <el-select
          v-model="model.advanceRemindByDay"
          :disabled="expireRemind === 0"
          placeholder
          size="mini"
          style="width:80%"
        >
          <el-option
            v-for="ops in days"
            :key="`advanceRemindByDay${ops}`"
            :label="ops"
            :value="ops"
          />
        </el-select>
      </el-col>
      <el-col :span="2" class="flow-form-label">
        <div>天</div>
      </el-col>
      <el-col :span="5" class="flow-form-label">
        <el-select
          v-model="model.advanceRemindByHour"
          :disabled="expireRemind === 0"
          placeholder
          size="mini"
          style="width:80%"
        >
          <el-option
            v-for="ops in hours"
            :key="`advanceRemindByHour${ops}`"
            :label="ops"
            :value="ops"
          />
        </el-select>
      </el-col>
      <el-col :span="2" class="flow-form-label">
        <div>小时</div>
      </el-col>
      <el-col :span="5" class="flow-form-label">
        <el-select
          v-model="model.advanceRemindByMinute"
          :disabled="expireRemind === 0"
          placeholder
          size="mini"
          style="width:80%"
        >
          <el-option
            v-for="ops in minites"
            :key="`advanceRemindByMinute${ops}`"
            :label="ops"
            :value="ops"
          />
        </el-select>
      </el-col>
      <el-col :span="3" class="flow-form-label">
        <div>分钟</div>
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
      expireRemind: 0,
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
      ]
    }
  },
  computed: {
    minites: function() {
      const arr = []
      for (let i = 1; i < 60; i++) {
        arr.push(i)
      }
      return arr
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
        !this.model.advanceRemind &&
        Object.prototype.toString.call(this.model.advanceRemind) ===
          '[object Undefined]'
      ) {
        this.model.advanceRemind = false
      }
      this.expireRemind = this.model.advanceRemind ? 1 : 0
    },

    changeExpireRemind(val) {
      this.model.advanceRemind = val === 1
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
