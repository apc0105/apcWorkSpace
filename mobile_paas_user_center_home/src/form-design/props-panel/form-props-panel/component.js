import eventbus from '@/form-design/utils/eventbus'
import FormElement from '@/form-design/form-props'
import components from '@/form-design/props-panel/components'
import assertshow from '@/form-design/props-panel/assert-show'

const SYNC_PROPS = ['width', 'labelWidth', 'labelAlign']

export default {
  name: 'form-form-props-panel',
  components: { ...components },
  props: {
    value: Object
  },
  data() {
    return {
      activeEl: {}
    }
  },
  created() {
    this.activeElement(this.json.config)
  },
  mounted() {

  },
  computed: {
    json() {
      return this.value
    },
    props() {
      const props = []
      const elType = 'form-config'
      const json = FormElement[elType].props

      for (const key in json) {
        props.push({ key, ...json[key] })
      }
      return props
    },
    propsConfig() {
      return {}
    }
  },
  methods: {
    activeElement(el) {
      this.activeEl = el
    },
    renderEl(item) {
      return assertshow(item.show, this.activeEl)
    },
    inputProp(e) {
      this.$emit('input', { ...this.json })
    },
    changeProp(key, value) {
      if (SYNC_PROPS.indexOf(key) >= 0) {
        console.log(key, value, '发生了变化，需要同步全局')
      }
    },
    deleteElement() {
      eventbus.$emit('deleteFormElement', this.activeEl)
    }
  }
}
