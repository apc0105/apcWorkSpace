<template>
  <div>
    <el-row style="padding-top:5px;">
      <el-col :span="24">
        <span class="flow-form-label">【用户】:</span>
        <span v-for="it in assigner.userList" :key="it.id" class="flow-form-selected">{{ it.name }}</span>
      </el-col>
    </el-row>
    <el-row style="padding-top:5px;">
      <el-col :span="24">
        <span class="flow-form-label">【岗位】:</span>
        <span v-for="it in assigner.postList" :key="it.id" class="flow-form-selected">{{ it.name }}</span>
      </el-col>
    </el-row>
    <el-row style="padding-top:5px;">
      <el-col :span="24">
        <span class="flow-form-label">【变量】:</span>
        <span
          v-for="it in assigner.variableList"
          :key="it.id"
          class="flow-form-selected"
        >{{ it.name }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  props: {
    assigner: {
      type: Object,
      required: true
    }
  }
}
</script>
<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 12px;
  color: #606266;
}
.flow-form-selected {
  padding-left: 5px;
  font-size: 12px;
  color: #606266;
}
</style>
