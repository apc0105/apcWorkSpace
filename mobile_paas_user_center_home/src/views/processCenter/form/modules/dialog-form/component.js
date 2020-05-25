import VForm from '../form';
import dialogFormMixin from '@/mixins/dialogFormMixin';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'FlowDefformDialogForm',
  mixins: [dialogFormMixin],
  components: { VForm },
  props: {
    id: {
      type: [Number, String]
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
