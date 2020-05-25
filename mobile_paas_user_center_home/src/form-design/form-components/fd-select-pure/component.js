import FdControlMixins from '../fd-control-mixin'
import FdSelectedMixins from '../fd-selected-mixin'
import PlaceHolderSelect from '@/components/PlaceHolderSelect'

export default {
  name: 'fd-select-pure',
  components: { PlaceHolderSelect },
  mixins: [FdControlMixins, FdSelectedMixins],
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
