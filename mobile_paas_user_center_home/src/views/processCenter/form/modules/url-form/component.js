import VForm from '../form'
import { mapState } from 'vuex'// mapGetters, mapActions

export default {
  name: 'FlowDefformForm',
  components: { VForm },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['defform']),
    postForm() {
      return this.defform.form.data
    },
    formId() {
      // debugger
      // console.log(this.$route.params.id)
      return this.$route.params.id
    }
  },
  created() {

  },
  methods: {
    submit() {
      this.$refs['form'].submit()
    }
  }
}
