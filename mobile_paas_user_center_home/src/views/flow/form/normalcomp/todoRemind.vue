<template>
  <div v-if="data && data.model">
    <el-row v-if="data && data.model" style="padding-top:5px;" class="flow-form-label">
      <el-col :span="24">
        <el-checkbox
          v-model="messageSending"
          :true-label="1"
          :false-label="0"
          @change="messageSendingChange"
        >待办提醒</el-checkbox>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="2">
        <el-checkbox-group
          v-if="remindList"
          v-model="remindList"
          :disabled="messageSending===0"
          @change="todoChangeList"
        >
          <el-checkbox label="email">邮件</el-checkbox>
          <el-checkbox label="sms">短信</el-checkbox>
          <el-checkbox label="message">消息</el-checkbox>
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
      remindList: [],
      messageSending: 1
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
        !this.model.messageSending &&
        Object.prototype.toString.call(this.model.messageSending) ===
          '[object Undefined]'
      ) {
        this.model.messageSending = true
      }
      this.messageSending = this.model.messageSending ? 1 : 0

      if (this.model.messageSending) {
        if (this.model.messageReminder) {
          this.remindList = this.model.messageReminder
        } else {
          this.remindList = ['message']
        }
      }
      this.model.messageReminder = this.remindList
    },

    messageSendingChange(val) {
      this.model.messageSending = val === 1
    },

    todoChangeList(val) {
      this.model.messageReminder = val
    }
  }
}
</script>
