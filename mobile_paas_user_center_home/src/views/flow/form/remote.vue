<template>
  <div>
    <el-card v-if="model" header="远程节点" size="mini">
      <el-tabs v-model="activeName">
        <el-tab-pane label="节点设置" name="setting">
          <node-label :data="data" :item="item" :graph="graph" :form-data-list="formDataList" />
          <el-divider content-position="left">远程地址</el-divider>
          <el-row>
            <el-col :span="6">
              <div class="flow-form-label">所属应用</div>
            </el-col>
            <el-col :span="18">
              <el-select v-model="model.appId" size="mini" style="width:100%" @change="appChange">
                <el-option
                  v-for="ops in appcfg.appList"
                  :key="ops.id"
                  :label="ops.appName"
                  :value="ops.id"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row style="padding-top:5px;">
            <el-col :span="6">
              <div class="flow-form-label">应用接口</div>
            </el-col>
            <el-col :span="18">
              <el-select v-model="model.ifsId" size="mini" style="width:100%">
                <el-option v-for="ops in options" :key="ops.id" :label="ops.name" :value="ops.id" />
              </el-select>
            </el-col>
          </el-row>
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
import {elMixin} from '../el-mixin'
export default {
  name: 'RemoteForm',
  mixins:[elMixin],
  components: {
    NodeEvent,
    NodeLabel
  },
  props: {
    formDataList: {
      type: Array,
      required: true
    },
    appcfg: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    eventSetting: {
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
      activeName: 'setting',
      appId: '',
      input: '',
      textarea: '',
      options: []
    }
  },
  watch: {
    item: function(val, oldVal) {
      if (val !== oldVal) {
        this.model = this.data.model
      }
    }
  },
  mounted() {
    this.model = this.data.model
  },
  methods: {
    appChange(val) {
      const tempApp = this.appcfg.appList.find(item => item.id === val)
      this.options = this.appcfg.ifsList.filter(
        item => item.appCode === tempApp.appCode
      )
      this.model.ifsId = ''
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
