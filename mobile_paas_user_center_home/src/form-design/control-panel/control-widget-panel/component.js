import eventbus from '@/form-design/utils/eventbus'
import DragDropMixins from '@/form-design/mixins/drag-drop-mixins'
import elements from '@/form-design/form-props'
import ElDnd from '@/directive/el-dnd'

export default {
  name: 'form-design-control-widget-panel',
  components: {},
  directives: { ElDnd },
  mixins: [DragDropMixins],
  props: {
    group: String
  },
  data() {
    return {}
  },
  computed: {
    elements() {
      const eles = []
      for (const key in elements) {
        const el = elements[key]
        if (!el.group || !el.name) {
          continue
        }
        if (el.group === this.group) {
          eles.push(el)
        }
      }
      return eles
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    addElement(type) {
      eventbus.$emit('addFormElement', type)
    },
    dndDragData(el) {
      return {
        group: this.dndGroupName,
        dndAdd: true,
        dragEnable: true,
        dropEnable: false,
        data: el,
        elType: el.name,
        elementId: -1
      }
    }
  }
}
