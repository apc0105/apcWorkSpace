<template>
  <el-tabs v-model="activeName" style="margin: -35px 0;" @tab-click="handleClick">
    <el-tab-pane label="用户" name="user">
      <user-form ref="userRefs" :style="styles" :actor="actor" :assigner="assigner" />
    </el-tab-pane>
    <el-tab-pane label="项目组" name="second">
      <post-form ref="postRefs" :style="styles" :actor="actor" :assigner="assigner" />
    </el-tab-pane>
    <el-tab-pane label="流程变量" name="third">
      <flow-form ref="flowRefs" :style="styles" :actor="actor" :assigner="assigner" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import FlowForm from '../curUserSelect/flow'
import PostForm from '../curUserSelect/post'
import UserForm from '../curUserSelect/user'
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  components: {
    FlowForm,
    PostForm,
    UserForm
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
      activeName: 'user',
      styles: 'height:400px'
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getValues() {
      const userIds = this.$refs.userRefs.value
      const postIds = this.$refs.postRefs.value
      const flowIds = this.$refs.flowRefs.value
      const userList = []
      userIds.forEach(item => {
        const temp = this.actor.userList.find(it => it.id === item)

        if (!temp) {
          return
        }
        userList.push({
          id: temp.id,
          name: temp.name
        })
      })
      const postList = []
      postIds.forEach(item => {
        const temp = this.actor.postList.find(it => it.id === item)
        if (!temp) {
          return
        }
        userList.push({
          id: temp.id,
          name: temp.name
        })
      })
      const variableList = []
      flowIds.forEach(item => {
        const temp = this.actor.flowVarList.find(it => it.id === item)
        if (!temp) {
          return
        }
        variableList.push({
          id: temp.id,
          name: temp.name
        })
      })
      return {
        userList,
        postList,
        variableList
      }
    }
  }
}
</script>
