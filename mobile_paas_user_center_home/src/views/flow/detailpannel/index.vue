<template>
  <div>
    <component
      :is="name"
      :graph="graph"
      :flow="flow"
      :data="data"
      :item="item"
      :props-data="propsData"
      :actor="actor"
      :event-setting="eventSetting"
      :appcfg="appcfg"
      :form-data-list="formDataList"
      :expire-handler="expireHandler"
    />
  </div>
</template>
<script>
import CanvasForm from '../form/canvas'
import decisionForm from '../form/decision'
import edgeForm from '../form/edge'
import endForm from '../form/end'
import normalForm from '../form/normal'
import startForm from '../form/start'
import remoteForm from '../form/remote'
export default {
  name: 'FlowDetailPannel',
  components: {
    CanvasForm,
    decisionForm,
    edgeForm,
    endForm,
    normalForm,
    startForm,
    remoteForm
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
    actor: {
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
    propsData: {
      type: Object,
      required: true
    },
    graph: {
      type: Object,
      required: true
    },
    flow: {
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
      name: 'CanvasForm',
      data: {}
    }
  },
  watch: {
    item: function(val, oldval) {
      if (val !== oldval) {
        if (val === 'canvas') {
          this.name = 'CanvasForm'
        } else {
          this.changeDetail()
        }
      }
    }
  },
  mounted() {},
  methods: {
    changeDetail() {
      const [item] = this.flow.getSelected()
      if (item) {
        if (item.model.type && item.model.type === 'node') {
          this.name = item.model.name + 'Form'
          if (!item.model.events) {
            item.model.events = {}
          }
          const { events } = item.model
          if (!events.nodeEntryEvent) {
            events.nodeEntryEvent = []
          }
          if (!events.nodeLeaveEvent) {
            events.nodeLeaveEvent = []
          }
          if (!events.nodeEntryInterceptor) {
            events.nodeEntryInterceptor = []
          }
          if (!events.nodeLeaveInterceptor) {
            events.nodeLeaveInterceptor = []
          }
          if (!events.taskCompletedEvent) {
            events.taskCompletedEvent = []
          }
          this.data = item
        } else {
          this.name = 'edgeForm'
          this.data = item
        }
      }
    }
  }
}
</script>
