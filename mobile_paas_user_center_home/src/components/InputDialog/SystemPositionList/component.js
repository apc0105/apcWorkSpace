import { mapState, mapGetters, mapActions } from 'vuex'
import ApiComponent from '@/components/ApiComponent'
import TreeTable from '@/components/TreeTable'
import pagesMixin from '@/mixins/pagesMixin'
import chooseMixin from '@/mixins/chooseMixin'

export default {
  name: 'SystemPositionList',
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
    ...mapState(['position']),
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
    ...mapActions(['getPositionSimplePages',]),
    initSelection(val){
      this.multipleSelection = val || []
    },
    pagesData(){
      return this.position.simplePage
    },
    getInitFilter() {
      return { keyword: this.keyword, status: 1 }
    },
    emitChangeSelection(){
      const rows = this.multipleSelection.map(item => ({
        ...item
      }))
      this.$emit('change', rows)
    },
    fetchPageData({ filter, sort, pager }){
      this.getPositionSimplePages({ filter, sort, pager }).then(data => {
        this.$emit('changePage', data.pager)
        this.$nextTick(() => this.initSelectionChange())
      })
    },

  }
}
