<template>
  <div>
    <el-card v-if="model" header="节点" size="mini">
      <el-tabs v-model="activeName">
        <el-tab-pane label="节点设置" name="setting">
          <el-row>
            <node-label :data="data" :item="item" :graph="graph" :form-data-list="formDataList" />
          </el-row>
          <todo-remind :data="data" :item="item" />
          <add-counter :data="data" :item="item" />
          <el-row style="padding-top:5px;">
            <el-col :span="24" class="flow-form-label">
              <el-checkbox
                v-model="complaint"
                :true-label="1"
                :false-label="0"
                @change="changeComplaint"
              >可转办(改派)</el-checkbox>
            </el-col>
          </el-row>
          <reject-able :data="data" :item="item" />
          <back-current :data="data" :item="item" />
          <recyclable-node :data="data" :item="item" />
          <onlyonce-approvable :data="data" :item="item" />
          <expire-opera :data="data" :item="item" />
          <advance-remind :data="data" :item="item" />

          <el-divider>操作权限</el-divider>
          <el-row>
            <el-col :span="24">
              <el-checkbox-group v-model="roleList" @change="changeRoleList">
                <el-checkbox label="intoReviewPage">默认为评审办理页面</el-checkbox>
                <!-- <el-checkbox label="canStopProcess">允许停止流程</el-checkbox>
                <el-checkbox label="canPrintForm">可打印单据</el-checkbox>
                <el-checkbox label="canToMail">可转发邮件</el-checkbox>
                <el-checkbox label="canToSupervisor">可转督办件</el-checkbox>
                <el-checkbox label="canToArchives">可转存文档库</el-checkbox> -->
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-divider>超时处理方式</el-divider>
          <el-row>
            <el-col :span="24">
              <el-select v-model="model.handlerByExpire" placeholder size="mini" style="width:100%">
                <el-option
                  v-for="it in expireHandler"
                  :key="`expire-handler-${it.value}`"
                  :value="it.value"
                  :label="it.name"
                >{{it.name}}</el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="参与者" name="apply">
          <actor-comp :data="data" :item="item" :actor="actor" />
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <node-event :data="data" :item="item" :event-setting="eventSetting" :appcfg="appcfg" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import NodeEvent from './components/nodeEvent'
import NodeLabel from './components/NodeLabel'
import TodoRemind from './normalcomp/todoRemind'
import AddCounter from './normalcomp/addCounter'
import BackCurrent from './normalcomp/backCurrent'
import RecyclableNode from './normalcomp/recyclable'
import OnlyonceApprovable from './normalcomp/onlyonceApprovable'
import RejectAble from './normalcomp/rejectable'
import ExpireOpera from './normalcomp/expireOpera'
import AdvanceRemind from './normalcomp/advanceRemind'
import ActorComp from './actorcomp/actor'
import {elMixin} from '../el-mixin'
export default {
  name: 'NormalForm',
  mixins:[elMixin],
  components: {
    NodeEvent,
    NodeLabel,
    TodoRemind,
    AddCounter,
    BackCurrent,
    RecyclableNode,
    OnlyonceApprovable,
    ExpireOpera,
    AdvanceRemind,
    ActorComp,
    RejectAble
  },

  props: {
    expireHandler: {
      type: Array,
      required: true
    },
    formDataList: {
      type: Array,
      required: true
    },
    appcfg: {
      type: Object,
      required: true
    },
    actor: {
      type: Object,
      required: true
    },
    eventSetting: {
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
    },
    graph: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: null,
      complaint: 0,
      activeName: 'setting',
      roleList: []
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
      if (!this.model.changeable) {
        this.model.changeable = true
      }
      this.complaint = this.model.changeable ? 1 : 0

      if (!this.model.OnFlowOpera) {
        this.model.OnFlowOpera = [
          'canPrintForm',
          'canToMail',
          'canToSupervisor'
        ]
      }
      this.roleList = this.model.OnFlowOpera
    },

    changeComplaint(val) {
      this.model.changeable = val === 1
    },

    changeRoleList(val) {
      this.model.OnFlowOpera = val
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
