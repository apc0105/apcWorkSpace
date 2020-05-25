import ElDnd from '@/directive/el-dnd'
import DragDropMixins from '@/form-design/mixins/drag-drop-mixins'
import components from '@/form-design/form-components'
import FormDesignEl from '@/form-design/form-design-el'
import { isLayout } from '@/form-design/form-props'

export default {
  name: 'form-design-form',
  directives: { ElDnd },
  mixins: [DragDropMixins],
  components: { ...components, FormDesignEl },
  props: {
    value: Object,
    formData: Object,
    activeEl: Object,
    mobile: Boolean
  },
  data() {
    return {}
  },

  computed: {
    dndDropData() {
      return {
        group: this.dndGroupName,
        dragEnable: false,
        dropEnable: true,
        elementId: 0
      }
    },
    json() {
      return this.value
    },
    childElementMap() {
      const map = {}
      this.json.elements.forEach(ele => {
        if (!ele || !ele.parentId) {
          return
        }
        const eleMap = map[ele.parentId] || {}
        eleMap[ele.id] = ele
        map[ele.parentId] = eleMap
      })
      return map
    },
    style() {
      if (this.json.config.bgColor) {
        return `background-color:${this.json.config.bgColor};`
      }
    },
    size() {
      return this.json.config.size || 'medium'
    },
    titleConfig() {
      return {
        ...this.json.config,
        width: '100%'
      }
    }
  },
  mounted() {

  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    isActiveEl(el) {
      return this.isEqualEl(this.activeEl, el)
    },
    isEqualEl(a, b) {
      if (!a || !b) {
        return false
      }
      return a.id === b.id
    },
    emitInput() {
      this.$emit('input', { ...this.json })
    },
    childElements(el) {
      if (!isLayout(el.type)) {
        return []
      }
      return this.childElementMap[el.id]
    }
  }
}
