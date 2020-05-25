import ElDnd from '@/directive/el-dnd'
import DragDropMixins from '@/form-design/mixins/drag-drop-mixins'
import components from '@/form-design/form-components/preview'
import FormPreviewEl from '@/form-design/form-preview-el'
import { isLayout } from '@/form-design/form-props'

export default {
  name: 'form-preview-form',
  directives: { ElDnd },
  mixins: [DragDropMixins],
  components: { ...components, FormPreviewEl },
  props: {
    value: Object,
    formData: Object,
    mobile: Boolean
  },
  data() {
    return {}
  },
  computed: {
    json() {
      return this.value
    },
    childElementMap() {
      const map = {}
      this.json.elements.forEach(ele => {
        if (!ele.parentId) {
          return
        }
        const eleMap = map[ele.parentId] || {}
        eleMap[ele.id] = ele
        map[ele.parentId] = eleMap
      })
      return map
    },
    size() {
      return this.json.config.size || 'medium'
    },
    style() {
      const styles = []
      styles.push('background-color:' + this.json.config.bgColor)
      if (!this.mobile) {
        styles.push('width:' + this.json.config.formWidth)
      }
      return styles.join(';')
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
    emitInput() {
      this.$emit('input', this.json)
    },
    childElements(el) {
      if (!isLayout(el.type)) {
        return []
      }
      return this.childElementMap[el.id]
    },
    validate(cb) {
      this.$refs['elForm'].validate(valid => cb(valid))
    }
  }
}
