<template>
  <div>
    <org-selected :actor="actor" @nodeClick="nodeClick" />
    <div class="cus-selected">
      <el-transfer v-model="value" :titles="['全部','已选']" :data="data" @change="transferChange" />
    </div>
  </div>
</template>

<script>
import OrgSelected from './org'
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  components: {
    OrgSelected
  },
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
      value: [],
      nodeId: ''
    }
  },
  mounted() {
    this.value = this.assigner.postList.map(item => item.id)
    this.initValues(this.data)
  },
  methods: {
    transferChange(arr, moveTo) {
      if (moveTo === 'left') {
        this.filterData()
      }
    },
    nodeClick(node) {
      this.nodeId = node.id
      this.filterData()
    },
    changeData() {
      // this.data.forEach
    },
    filterData() {
      this.tempList = []
      const arr = this.actor.postList
        .filter(
          item =>
            item.pid === this.nodeId &&
            item.type === '999' &&
            this.value.findIndex(it => it === item.id) < 0
        )
        .map(item => {
          return {
            key: item.id,
            label: item.name,
            pid: item.pid
          }
        })
      this.initValues(arr)
      this.data = arr
    },
    initValues(arr) {
      for (let i = 0; i < this.value.length; i++) {
        const index = arr.findIndex(item => item.id === this.value[i])
        if (index < 0) {
          const tempData = this.actor.postList.find(
            item => item.id === this.value[i]
          )
          const tempNode = {
            key: tempData.id,
            label: tempData.name,
            pid: tempData.pid
          }
          arr.push(tempNode)
        }
      }
    }
  }
}
</script>
<style lang="scss" scope>
.org {
  width: 250px;
  border: 1px solid #eee;
  border-radius: 5px;
  height: 400px;
  overflow: scroll;
  float: left;
}
.cus-selected {
  float: left;
  padding-left: 10px;
  .el-transfer {
    .el-transfer__buttons {
      // width: 10%;
      padding: 0 5px;
    }
  }
  .el-transfer-panel {
    width: 227px;
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
