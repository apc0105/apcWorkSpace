import { mapState, mapGetters, mapActions } from 'vuex'
import pagesMixin from '@/mixins/pagesMixin'
import ApiComponent from '@/components/ApiComponent'
import DeleteBtn from '@/components/DeleteBtn'
import DeleteBatch from '@/components/DeleteBatch'
import SelectedInfo from '@/components/SelectedInfo'

export default {
  name: 'FlowDefformList',
  mixins: [pagesMixin],
  components: {
    ApiComponent,
    DeleteBtn,
    DeleteBatch,
    SelectedInfo,
  },
  computed: {
    ...mapState(['defform']),
  },
  data(){
    return {
      multipleSelection: [],
      keyword: null,
      status: null,
    }
  },
  created(){
    this.createLoad()
  },
  methods: {
    ...mapActions(['getDefforms',]),
    pagesData(){
      return this.defform.pages
    },
    getInitFilter() {
      const pages = this.pagesData()
      const { filter } = pages.data
      filter.keyword = this.keyword
      filter.status = this.status
      return filter
    },
    fetchPageData({ filter, sort, pager }){
      this.getDefforms({ filter, sort, pager })
    },
    delete1(id){
      this.$store.dispatch('deleteDefform', id).then(data => {
        this.reloadPage()
      })
    },
    deletes(){
      const ids = this.multipleSelection.flatMap(item => item.id)
      this.$store.dispatch('deleteDefforms', ids).then(data => {
        this.reloadPage()
      })
    },
    enables(){
      const ids = this.multipleSelection.flatMap(item => item.id)
      this.$store.dispatch('updateDefformStatus', { ids, status: 1 }).then(data => {
        this.reloadPage()
      })
    },
    disables(){
      const ids = this.multipleSelection.flatMap(item => item.id)
      this.$store.dispatch('updateDefformStatus', { ids, status: 0 }).then(data => {
        this.reloadPage()
      })
    },
    enable(id){
      const ids = [id]
      this.$store.dispatch('updateDefformStatus', { ids, status: 1 }).then(data => {
        this.reloadPage()
      })
    },
    disable(id){
      const ids = [id]
      this.$store.dispatch('updateDefformStatus', { ids, status: 0 }).then(data => {
        this.reloadPage()
      })
    },
  }
}
