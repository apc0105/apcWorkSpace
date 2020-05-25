<template>
  <div>
    <el-row style="padding-top:5px;" v-if="title">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="showDialogChange">{{ title }}</el-button>
      </el-col>
    </el-row>
    <div v-if="assigner">
      <el-dialog
        :visible="showDialog"
        :close-on-click-modal="false"
        width="800px"
        :destroy-on-close="true"
        append-to-body
        class="cus-dialog-container"
        @close="dialogColse"
      >
        <div slot="title" class="dialog-title">组织机构框</div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="showDialog = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogOk">确定</el-button>
        </div>
        <person-select ref="dialogRef" :actor="actor" :assigner="assigner" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PersonSelect from './personSelecte'
import { elMixin } from '../../el-mixin'
export default {
  name: 'SelectForm',
  mixins: [elMixin],
  components: {
    PersonSelect
  },
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    actor: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      assigner: null,
      showDialog: false
    }
  },
  mounted () {},
  methods: {
    init () {},
    showDialogBefore (assigner) {
      this.assigner = assigner
      this.showDialog = true
    },
    showDialogChange () {
      this.$emit('showDialog')
    },
    dialogOk () {
      const actor = this.$refs.dialogRef.getValues()
      this.$emit('selected', actor)
      this.assigner = null
      this.showDialog = false
    },
    dialogColse () {
      this.assigner = null
      this.showDialog = false
    }
  }
}
</script>
<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 14px;
}
.dialog-title {
  font-size: 14px;
}
</style>
