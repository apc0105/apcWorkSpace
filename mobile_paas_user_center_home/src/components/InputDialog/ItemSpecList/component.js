import {mapState, mapGetters, mapActions} from 'vuex'
import pagesMixin from '@/mixins/pagesMixin'
import ApiComponent from '@/components/ApiComponent'
import DeleteBtn from '@/components/DeleteBtn'
import DeleteBatch from '@/components/DeleteBatch'
import SelectedInfo from '@/components/SelectedInfo'
import chooseMixin from '@/mixins/chooseMixin'

export default {
  name: 'ItemSpecList',
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
    DeleteBtn,
    DeleteBatch,
    SelectedInfo,
  },
  computed: {
    ...mapState(['itemSpec']),
  },
  data(){
    return {
      multipleSelection: [],
      keyword: null,
      dialogVisible: false,
      dialogImageUrl: null,
    }
  },
  created(){
    this.createLoad()
  },
  methods: {
    ...mapActions(['getItemSimpleSpecs',]),
    pagesData(){
      return this.itemSpec.simplePages
    },
    emitChangeSelection(){
      const rows = this.multipleSelection.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        options: [...item.options],
      }))
      this.$emit('change', rows)
    },
    fetchPageData({filter, sort, pager}){
      this.getItemSimpleSpecs({filter, sort, pager}).then(data => {
        this.$nextTick(() => this.initSelectionChange())
        this.$emit('changePage', data.pager)
      })
    },
    array2string(options){
      if (!options || options.length == 0) {
        return '-'
      }
      return options.map(item => item.name).join('、')
    },
  }
}
