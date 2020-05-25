<template>
  <div v-if="model">
    <event-label label="节点进入触发器:" @addEvent="addEvent('startEventRefs')" />
    <event-part
      ref="startEventRefs"
      :events="events.nodeEntryEvent"
      :event-list="eventSetting.eventList"
      :appcfg="appcfg"
    />
    <event-label label="节点离开触发器:" @addEvent="addEvent('leaveEventRefs')" />
    <event-part
      ref="leaveEventRefs"
      :events="events.nodeLeaveEvent"
      :event-list="eventSetting.eventList"
      :appcfg="appcfg"
    />
    <event-label label="节点进入拦截器:" @addEvent="addEvent('startInterceptorRefs')" />
    <event-part
      ref="startInterceptorRefs"
      :events="events.nodeEntryInterceptor"
      :event-list="eventSetting.interceptorList"
      :appcfg="appcfg"
    />
    <event-label label="节点离开拦截器:" @addEvent="addEvent('leaveInterceptorRefs')" />
    <event-part
      ref="leaveInterceptorRefs"
      :events="events.nodeLeaveInterceptor"
      :event-list="eventSetting.interceptorList"
      :appcfg="appcfg"
    />
    <event-label label="任务完成事件:" @addEvent="addEvent('backInterceptorRefs')" />
    <event-part
      ref="backInterceptorRefs"
      :events="events.taskCompletedEvent"
      :event-list="eventSetting.eventList"
      :appcfg="appcfg"
    />
  </div>
</template>
<script>
import EventPart from './eventPart'
import EventLabel from './eventLabel'
export default {
  name: 'NodeEvent',
  components: {
    EventPart,
    EventLabel
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    appcfg: {
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
    }
  },
  data() {
    return {
      model: null,
      events: {}
    }
  },
  computed: {},
  watch: {
    item: function(val, oldVal) {
      this.initEvent()
    }
  },
  mounted() {
    this.initEvent()
  },
  methods: {
    initEvent() {
      this.events = this.data.model.events
      this.model = this.data.model
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
