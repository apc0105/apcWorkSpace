<template>
  <div class="cus-flow">
    <el-transfer v-model="value" :titles="['全部','已选']" style="width:100%" :data="data" />
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
    },
    actor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data: [],
      value: []
    }
  },
  mounted() {
    this.data = this.actor.flowVarList.map(item => {
      return {
        key: item.id,
        label: item.name
      }
    })
    this.value = this.assigner.variableList.map(item => item.id)
  }
}
</script>
<style lang="scss" scope>
.cus-flow {
  .el-transfer {
    .el-transfer__buttons {
      // width: 10%;
      padding: 0 5px;
    }
  }
  .el-transfer-panel {
    width: 357px;
    height: 400px;
    .el-transfer-panel__list {
      height: 360px;
    }
    .el-transfer-panel__body {
      height: 360px;
    }
    .el-transfer-panel__header {
      .el-checkbox {
        .el-checkbox__label {
          font-size: 14px;
        }
      }
    }
    .el-transfer-panel__item {
      width: calc(100% - 30px);
    }
  }
}
</style>
