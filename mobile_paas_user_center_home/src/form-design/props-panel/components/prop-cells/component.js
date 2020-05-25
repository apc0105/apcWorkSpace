import PropsMixin from "../props-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";

export default {
  name: 'prop-cells',
  mixins: [PropsMixin],
  components: { FdFormItem },
  data(){
    return {}
  },
  computed: {
    elements(){
      if (!this.value) {
        return []
      }
      return this.value.map((item, index) => {
        item._id = index
        return item
      })
    },
  },
  methods: {
    inputWeight(){
      const value = this.elements;
      this.input([...value])
    }
  }
}
