<template>
  <el-dialog
    :visible="showDialog"
    :close-on-click-modal="false"
    width="750px"
    :destroy-on-close="true"
    class="cus-dialog-container"
    :append-to-body="true"
    @close="dialogColse"
  >
    <div slot="title" class="dialog-title">流程处理</div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="showDialog = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="dialogOk">确定</el-button>
    </div>
    <flow-dialog ref="flowRef" :actor="actor" :assigner-list="assignerList"></flow-dialog>
  </el-dialog>
</template>

<script>
import FlowDialog from './normal'
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  components: {
    FlowDialog
  },
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
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    dialogColse() {
      this.showDialog = false
    },
    dialogOk() {
      this.$emit('handleOk', this.$refs.flowRef.getValue())
    },
    changeDialogState(val) {
      this.showDialog = val
    }
  }
}
</script>

