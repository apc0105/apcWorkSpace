import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin';
import FdSelectPure from '../fd-select-pure';

export default {
  name: 'fd-select',
  components: { FdSelectPure , FdFormItem },
  mixins: [FdControlMixins],
  props: {
    value: [String, Number]
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
