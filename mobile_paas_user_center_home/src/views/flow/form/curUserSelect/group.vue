<template>
  <div class="group">
    <el-tree
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false"
      @node-click="nodeClick"
    />
  </div>
</template>

<script>
import { transformToTreeFormat } from '@/utils'
import {elMixin} from '../../el-mixin'
export default {
  name: 'GroupComp',
  mixins:[elMixin],
  props: {
    actor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    const tempData = this.actor.groupList.map(item => {
      console.log('---------------groupList-----------', item)
      return {
        id: item.id,
        pid: item.pid,
        label: item.name
      }
    })

    console.log(tempData)
    this.treeData = transformToTreeFormat(
      { key: 'id', parentKey: 'pid' },
      tempData
    )
  },
  methods: {
    nodeClick(node) {
      this.$emit('nodeClick', node)
    }
  }
}
</script>
<style lang="scss" scope>
.group {
  width: 250px;
  border: 1px solid #eee;
  border-radius: 5px;
  height: 400px;
  overflow: scroll;
  float: left;
}
</style>
