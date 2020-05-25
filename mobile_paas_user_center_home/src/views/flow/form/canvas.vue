<template>
  <div>
    <el-card header="流程设置" size="mini">
      <event-label label="流程启动触发器:" @addEvent="addEvent('startEventRefs')" />
      <event-part
        ref="startEventRefs"
        :events="startEvent"
        :event-list="eventSetting.eventList"
        :appcfg="appcfg"
      />
      <event-label label="流程终止时触发器:" @addEvent="addEvent('stopEventRefs')" />
      <event-part
        ref="stopEventRefs"
        :events="stopEvent"
        :event-list="eventSetting.eventList"
        :appcfg="appcfg"
      />
      <event-label label="流程挂起(暂停)时触发器:" @addEvent="addEvent('pauseEventRefs')" />
      <event-part
        ref="pauseEventRefs"
        :events="pauseEvent"
        :event-list="eventSetting.eventList"
        :appcfg="appcfg"
      />
      <event-label label="流程完成时触发器:" @addEvent="addEvent('endEventRefs')" />
      <event-part
        ref="endEventRefs"
        :events="endEvent"
        :event-list="eventSetting.eventList"
        :appcfg="appcfg"
      />
    </el-card>
  </div>
</template>
<script>
import EventLabel from './components/eventLabel'
import EventPart from './components/eventPart'
import {elMixin} from '../el-mixin'
export default {
  name: 'CanvasForm',
  mixins:[elMixin],
  components: { EventPart, EventLabel },
  props: {
    eventSetting: {
      type: Object,
      required: true
    },
    appcfg: {
      type: Object,
      required: true
    },
    propsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      startEvent: [],
      stopEvent: [],
      pauseEvent: [],
      endEvent: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.startEvent = this.propsData.events.startEvent
      this.stopEvent = this.propsData.events.stopEvent
      this.pauseEvent = this.propsData.events.pauseEvent
      this.endEvent = this.propsData.events.endEvent
    },
    addEvent(ref) {
      this.$refs[ref].add()
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
