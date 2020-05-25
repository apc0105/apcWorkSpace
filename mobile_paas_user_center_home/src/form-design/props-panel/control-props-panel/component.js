import { getMatchDefobjectFields } from '@/api/flow/defform'
import eventbus from '@/form-design/utils/eventbus'
import FormElement from '@/form-design/form-props'
import components from '@/form-design/props-panel/components'
import assertshow from '@/form-design/props-panel/assert-show'

export default {
  name: 'form-control-props-panel',
  components: { ...components },
  props: {
    value: Object,
    formId: [String, Number],
  },
  data (){
    return {
      activeEl: {},
      defobjectFields: [],
    }
  },
  created(){
    this.initDefObjectFields()
  },
  mounted(){
    eventbus.$on('activeFormElement', el => {
      this.activeElement(el)
    })
    eventbus.$on('updateDefobjectFields', () => {
      this.initDefObjectFields()
    })
  },
  destroyed(){
    eventbus.$off('activeFormElement')
    eventbus.$off('updateDefobjectFields')
  },
  computed: {
    json(){
      return this.value
    },
    props () {
      const props = []
      if (!this.activeEl || !this.activeEl.type) {
        return props
      }
      const elType = this.activeEl.type
      const json = FormElement[elType].props

      for (let key in json) {
        props.push({ key, ...json[key] })
      }
      return props
    },
    propsConfig(){
      return {}
    },
  }
  ,
  methods: {
    initDefObjectFields(){
      if (!this.formId) {
        return
      }
      // console.log(this.formId)
      // getMatchDefobjectFields(this.formId).then(data => {
      //   this.defobjectFields = data.data
      // })
    },
    activeElement(el){
      this.activeEl = el
    },
    renderEl(item){
      return assertshow(item.show, this.activeEl)
    },
    inputProp(e){
      this.$emit('input', { ...this.json })
    },
    deleteElement(){
      eventbus.$emit('deleteFormElement', this.activeEl)
    },
  }
}
