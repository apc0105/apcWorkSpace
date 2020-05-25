<template>
  <el-row>
    <el-col :span="24">
      <div class="flow-form-label">
        <span>{{ label }}</span>
        <i class="el-icon-circle-plus-outline" @click="add" />
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {elMixin} from '../../el-mixin'
export default {
  name: 'EventLabel',
  mixins:[elMixin],
  props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    add() {
      this.$emit('addEvent')
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
