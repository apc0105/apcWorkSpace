import PropsMixin from '../props-mixin'
import components from '@/form-design/form-components'
import FormPreviewEl from '@/form-design/form-preview-el'
import PropTable from '../prop-table'
import PropFieldSelect from '../prop-field-select'
import PropCells from '../prop-cells'
import PropRich from '../prop-rich'
import PropColumns from '../prop-columns'
import PropExpression from '../prop-expression'
import assertshow from '../../assert-show'
export default {
  name: 'prop-object',
  components: {
    ...components,
    [PropRich.name]: PropRich,
    [PropCells.name]: PropCells,
    [PropColumns.name]: PropColumns,
    [PropTable.name]: PropTable,
    [PropFieldSelect.name]: PropFieldSelect,
    [PropExpression.name]: PropExpression,
    [FormPreviewEl.name]: FormPreviewEl
  },
  mixins: [PropsMixin],
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    defobjectFields: [Array],
    json: Object
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    props() {
      const props = []
      if (!this.data) {
        return props
      }
      const json = this.data.props
      for (const key in json) {
        props.push({ key, ...json[key] })
      }
      return props
    }
  },
  created() {
    this.visible = this.data.visible
  },
  methods: {
    input(key, value) {
      this.$emit('input', this.value)
      this.$emit('change', key, value)
    },
    renderEl(item) {
      return assertshow(item.show, this.value)
    },
    renderData(item) {
      return item
    },
    toggleVisible() {
      this.visible = !this.visible
    }
  }
}
