import { mapState, mapGetters, mapActions } from 'vuex'
import ApiComponent from '@/components/ApiComponent'
import TreeTable from '@/components/TreeTable'
import pagesMixin from '@/mixins/pagesMixin'
import chooseMixin from '@/mixins/chooseMixin'

export default {
  name: 'SystemRoleList',
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
    ...mapState(['role']),
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
    ...mapActions(['getRoleSimplePages',]),
    initSelection(val){
      this.multipleSelection = val || []
    },
    pagesData(){
      return this.role.simplePage
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
      this.getRoleSimplePages({ filter, sort, pager }).then(data => {
        this.$emit('changePage', data.pager)
        this.$nextTick(() => this.initSelectionChange())
      })
    },

  }
}
