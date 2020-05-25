import PropsMixin from "../props-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";
import ByteSwitch from "@/components/ByteSwitch";

const fixOptions = [
  { key: null, label: 'label.flow.formdesign.cells.fixednone', },
  { key: 'left', label: 'label.flow.formdesign.cells.fixedleft', },
  { key: 'right', label: 'label.flow.formdesign.cells.fixedright', },
]

const alignOptions = [
  { key: 'left', label: 'label.flow.formdesign.labelalign.left', },
  { key: 'center', label: 'label.flow.formdesign.labelalign.center', },
  { key: 'right', label: 'label.flow.formdesign.labelalign.right', },
]


export default {
  name: 'prop-columns',
  mixins: [PropsMixin],
  components: { FdFormItem, ByteSwitch },
  data(){
    return {
      fixOptions: fixOptions,
      alignOptions: alignOptions,
    }
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
