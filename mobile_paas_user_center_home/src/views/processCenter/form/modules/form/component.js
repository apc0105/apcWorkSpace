import formMixin from '@/mixins/formMixin'
import { mapState, mapActions } from 'vuex'// mapGetters,
// import { fetchDataList } from '@/api/form'
import {getAction} from '@/api/data'
// import { checkResponse } from '@/utils/request'
import FormDesign from '@/form-design'
import defaultJson2 from '@/form-design/default.json2'
export default {
  mixins: [formMixin],
  name: 'FlowDefformForm',
  components: { FormDesign },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isCopy: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String]
    }
  },
  data() {
    return {
      timestamp: this.initTimeStamp(),
      rules: {
        key: [this.validateRequired(this.i18n('label.flow.defform.key'))],
        name: [this.validateRequired(this.i18n('label.flow.defform.name'))],
        status: [this.validateRequired(this.i18n('label.flow.defform.status'))],
        items: [this.validateArrayRequire(this.i18n('label.flow.defform.items'))]
      },
      isShow: false,
      value: {},
      parent: null,
      activeTab: 'basic-info',
      // activeTab: 'json-info',
      keyValue: null
    }
  },
  computed: {
    ...mapState(['defform']),
    postForm() {
      return this.defform.form.data
    },
    tipsLength() {
      return this.postForm.desc ? this.postForm.desc.length : 0
    },
    keyFormat() {
      return 'com.github.micro.'
    }
  },
  created() {
    this.initForm()
    // console.log(this.$route.params)
    // console.log('000000000000000000000000000000000000')
    // console.log(this.$route.params)
    if (this.$route.query.templateId !== '') {
      this.fetchIninFormData(this.$route.params.id)
    }
  },
  methods: {
    // 获取初始化表单数据
    fetchIninFormData(id) {
      getAction('/mock/formExa1.json').then(res => {
        this.isShow = true
        // console.log(res)
        // console.log(JSON.parse(res.data.content))
        this.value = res.data.formContent || defaultJson2
        // this.mailList = res.data.mailData
      }).catch(err => {
        console.log(err)
      })
    },
    ...mapActions(['getDefformById']),
    initKeyValue() {
      let key = this.postForm.key
      if (key) {
        key = key.replace(this.keyFormat, '')
      }
      this.keyValue = key
    },
    inputKey(key) {
      this.postForm.key = key ? this.keyFormat + key : null
    },
    initParent() {
      if (this.postForm) {
        this.parent = this.postForm.parent
      } else {
        this.parent = null
      }
    },
    inputParent(val) {
      this.parent = val
      if (val) {
        this.postForm.parentId = val.id
      } else {
        this.postForm.parentId = null
      }
    },
    formData() {
      return this.defform.form
    },
    getFormId() {
      return this.id
    },
    initCreateForm(id) {
      this.$store.dispatch('initDefformByData', { id, status: 1, fields: [] }).then(data => {
        this.initKeyValue()
      })
    },
    initEditForm(id) {
      this.$store.dispatch('getDefformById', id).then(data => {
        this.initKeyValue()
        if (!data.fields) {
          [
            data.fields = []
          ]
        }
      })
    },
    submitPostForm(data) {
      return this.$store.dispatch('postDefform', data)
    },
    submitPutForm(data) {
      if (this.isCopy) {
        delete data.id
        return this.$store.dispatch('postDefform', data)
      } else {
        return this.$store.dispatch('putDefform', data)
      }
    },
    formValidate() {
      console.log(this.postForm)
      if (!this.postForm.json) {
        this.$message({
          message: '请添加控件',
          type: 'warning'
        })
        return false
      }
      return true
    },
    handleClick(tab, event) {
      this.activeTab = tab.name
    }
  }
}
