import { mapState, mapGetters, mapActions } from 'vuex'
import ApiComponent from '@/components/ApiComponent'
import TreeTable from '@/components/TreeTable'
import pagesMixin from '@/mixins/pagesMixin'
import chooseMixin from '@/mixins/chooseMixin'

export default {
  name: 'FlowDefobjectList',
  mixins: [pagesMixin, chooseMixin],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Array,
    },
  },
  components: {
    ApiComponent,
    TreeTable,
  },
  computed: {
    ...mapState(['defobject']),
    singleItemId() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        return this.multipleSelection[0].id
      }
    }
  },
  watch: {
    selection(val){
      this.initSelection(val)
    }
  },
  data(){
    return {
      keyword: null
    }
  },
  created(){
    this.initSelection(this.selection)
    this.createLoad()
  },
  methods: {
    ...mapActions(['getDefobjectSimplePages',]),
    initSelection(val){
      this.multipleSelection = val || []
    },
    pagesData(){
      return this.defobject.simplePage
    },
    getInitFilter() {
      return { keyword: this.keyword }
    },
    emitChangeSelection(){
      const rows = this.multipleSelection.map(item => ({
        ...item,
        name: `${item.name}(${item.key})[${item.version}]`,
      }))
      this.$emit('change', rows)
    },
    fetchPageData({ filter, sort, pager }){
      this.getDefobjectSimplePages({ filter, sort, pager }).then(data => {
        this.$emit('changePage', data.pager)
        this.$nextTick(() => this.initSelectionChange())
      })
    },

  }
}
