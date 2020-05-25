<template>
  <div v-if="data && data.model">
    <el-row>
      <el-col :span="24">
        <div class="flow-form-label">办理模式:</div>
      </el-col>
    </el-row>
    <el-row style="padding-top:5px;">
      <el-col :span="24">
        <el-radio-group v-model="anyoneApprove" size="mini" @change="changAnyoneApprove">
          <el-radio label="anyoneApprove">抢占模式，任意一人执行即可</el-radio>
          <el-radio label="countersignApprove">会签模式，所有被指派人全部执行</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="padding-top:5px;">
      <el-col :offset="2" :span="22">
        <el-radio-group
          v-model="onAnyoneApprove"
          :disabled="anyoneApprove !== 'countersignApprove'"
          size="mini"
          @change="changeOnAnyoneApprove"
        >
          <el-radio label="countersignByParallel">并行会签，多人同时处理</el-radio>
          <el-radio label="countersignBySerial">串行会签，将参与者列表按顺序进行串行会签</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="padding-top:5px;">
      <el-col :span="24">
        <el-checkbox
          :true-label="1"
          :false-label="0"
          v-model="canAssignByRange"
          @change="changeCanAssignByRange"
        >允许在已指派的范围内二次指派</el-checkbox>
      </el-col>
    </el-row>
    <div v-if="model.assigner">
      <select-form
        ref="assignerRefs"
        :data="data"
        :item="item"
        :actor="actor"
        title="参与者设置"
        @selected="selected"
        @showDialog="assignerDialog"
      />
      <actor-show :assigner="assigner" />
    </div>
    <div v-if="model.ccAssigner">
      <select-form
        ref="ccAssignerRefs"
        :data="data"
        :item="item"
        :actor="actor"
        title="抄送设置"
        @selected="ccSelected"
        @showDialog="ccAssignerDialog"
      />
      <actor-show :assigner="ccAssigner" />
    </div>
  </div>
</template>

<script>
import SelectForm from './selectForm'
import ActorShow from './actorShow'
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  components: {
    SelectForm,
    ActorShow
  },
  props: {
    actor: {
      type: Object,
      required: true
    },
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
      anyoneApprove: 'countersignApprove',
      assigner: {
        userList: [],
        postList: [],
        variableList: []
      },
      ccAssigner: {
        userList: [],
        postList: [],
        variableList: []
      },
      canAssignByRange: 0,
      onAnyoneApprove: 'countersignByParallel'
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
      if (!this.model.approveMode) {
        this.model.approveMode = 'countersignApprove'
      }
      this.anyoneApprove = this.model.approveMode

      if (
        this.anyoneApprove === 'countersignApprove' &&
        !this.model.onAnyoneApprove
      ) {
        this.model.onAnyoneApprove = 'countersignByParallel'
      }

      if (!this.model.assigner) {
        this.model.assigner = {
          userList: [],
          postList: [],
          variableList: []
        }
      }
      this.assigner = this.model.assigner

      if (!this.model.ccAssigner) {
        this.model.ccAssigner = {
          userList: [],
          postList: [],
          variableList: []
        }
      }
      this.ccAssigner = this.model.ccAssigner
      if (
        !this.model.canAssignByRange &&
        Object.prototype.toString.call(this.model.canAssignByRange) ===
          '[object Undefined]'
      ) {
        this.model.canAssignByRange = false
      }
      this.canAssignByRange = this.model.canAssignByRange ? 1 : 0
    },
    assignerDialog() {
      this.$refs.assignerRefs.showDialogBefore(this.model.assigner)
    },
    ccAssignerDialog() {
      this.$refs.ccAssignerRefs.showDialogBefore(this.model.ccAssigner)
    },
    changAnyoneApprove(val) {
      this.model.approveMode = val
    },
    selected(assigner) {
      this.model.assigner = assigner
      this.assigner = assigner
    },
    ccSelected(ccAssigner) {
      this.model.ccAssigner = ccAssigner
      this.ccAssigner = ccAssigner
    },
    changeCanAssignByRange(val) {
      this.model.canAssignByRange = val === 1
    },
    changeOnAnyoneApprove(val) {
      this.model.onAnyoneApprove = val
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
