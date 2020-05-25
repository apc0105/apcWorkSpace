<template>
  <div style="margin: -30px -10px;">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card" shadow="never" header="下一环节节点">
          <div style="height:300px;overflow-y:auto">
            <div
              class="label-once"
              v-for="(item,index) in assignerList"
              :key="item.id+'assigner-list'"
            >
              <el-checkbox v-model="item.value" />
              <span class="node-name" @click.stop="changeItem(item)">{{item.name}}</span>
              <span
                style="float:right;cursor: pointer;"
                v-if="item.emptyByUserList"
                title="选择人员"
                @click.stop="selectUser(item)"
              >
                <i class="el-icon-user"></i>
              </span>
              
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card" shadow="never" :header="title+'环节执行人选择:'">
          <div style="height:300px;overflow-y:auto">
            <div class="label-once">
              <span class="node-name">【用户】:</span>
              <span class="user-info" v-for="(item,index) in userList" :key="item.id+'user-list'">
                <el-checkbox :disabled="!canAssignByRange" v-model="item.value">{{item.name}}</el-checkbox>
              </span>
            </div>
            <div class="label-once">
              <span class="node-name">【岗位】:</span>
              <span class="user-info" v-for="(item,index) in postList" :key="item.id+'post-list'">
                <el-checkbox v-model="item.value">{{item.name}}</el-checkbox>
              </span>
            </div>
            <div class="label-once">
              <span class="node-name">【变量】:</span>
              <span
                class="user-info"
                v-for="(item,index) in variableList"
                :key="item.id+'flow-list'"
              >
                <el-checkbox v-model="item.value">{{item.name}}</el-checkbox>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <select-form
      ref="assignerRefs"
      :data="data"
      :actor="actor"
      title
      @selected="selected"
      @showDialog="assignerDialog"
    />
  </div>
</template>

<script>
import SelectForm from '../actorcomp/selectForm'
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  props: {
    assignerList: {
      type: Array,
      required: true
    },
    actor: {
      type: Object,
      required: true
    }
  },
  components: {
    SelectForm
  },
  data() {
    return {
      data: {},
      item: null,
      title: '',
      userList: [],
      variableList: [],
      postList: [],
      canAssignByRange: false
    }
  },
  methods: {
    initData(item) {
      if (!item.assigner.postList) {
        item.assigner.postList = []
      }
      this.postList = item.assigner.postList
      if (!item.assigner.variableList) {
        item.assigner.variableList = []
      }
      this.variableList = item.assigner.variableList
    },
    changeItem(item) {
      this.title = `【${item.name}】`
      this.canAssignByRange = item.canAssignByRange

      this.initData(item)
      if (!this.canAssignByRange) {
        item.assigner.userList.forEach(item => {
          item.value = true
        })
      }
      this.userList = item.assigner.userList
    },
    selectUser(item) {
      this.item = item
      this.initData(item)
      this.assignerDialog()
    },
    assignerDialog() {
      this.$refs.assignerRefs.showDialogBefore(this.item.assigner)
    },
    selected(assigner) {
      assigner.userList.forEach(item => {
        item.value = true
      })
      assigner.postList.forEach(item => {
        item.value = true
      })
      assigner.variableList.forEach(item => {
        item.value = true
      })
      this.item.assigner = assigner
      this.initData(this.item)
      this.userList = this.item.assigner.userList
    },
    getValue() {
      return this.assignerList
        .map(item => {
          return Object.assign(
            {},
            {
              id: item.id,
              name: item.name,
              value: !!item.value,
              assigner: {
                userList: item.assigner.userList.filter(it => it.value),
                postList: item.assigner.postList.filter(it => it.value),
                variableList: item.assigner.variableList.filter(it => it.value)
              }
            }
          )
        })
        .filter(item => item.value)
        .map(item =>
          Object.assign(item, {
            isAssigner:
              item.assigner.userList.length > 0 ||
              item.assigner.postList.length > 0 ||
              item.assigner.variableList.length > 0
          })
        )
    }
  }
}
</script>

<style lang="scss">
.node-name {
  font-size: 14px;
  cursor: pointer;
}
.user-info {
  padding: 2px 5px;
}
.label-once {
  padding: 5px 0;
}
</style>
