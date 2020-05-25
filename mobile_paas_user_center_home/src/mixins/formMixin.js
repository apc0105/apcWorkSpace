import { isLoading, isInit, isSuccess } from '@/store/stateUtil'
import { getHeader } from '@/utils/flowrRequest'
import { validateEmail, validatePhone } from '@/utils/validate'
import { fetchDataList } from '@/api/form'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.initForm()
  },
  beforeDestroy() {
    this.checkCloseOrSwitch()
  },
  activated() {
    this.initForm()
  },
  deactived() {
    console.log('deactiveddeactived')
  },
  computed: {
    postForm() {
      return this.formData().data
    }
  },
  data() {
    return {
      routePath: null,
      submitLoading: false
    }
  },
  methods: {
    isLoading() {
      return isLoading(this.formData)
    },
    initTimeStamp() {
      return new Date().getTime()
    },
    updateTimeStamp() {
      this.timestamp = this.initTimeStamp()
    },
    uploadUrl() {
      return process.env.BASE_API + '/file/upload/image'
    },
    uploadHeader() {
      return getHeader()
    },
    getFormId() {
      return this.$route.params.id
    },
    initForm() {
      this.routePath = this.$route.fullPath
      if (this.isEdit) {
        const id = this.getFormId()
        const formData = this.formData()
        const dataId = formData.data ? formData.data.id : null
        if (isSuccess(formData) && dataId == id) {
          return
        }
        this.initEditForm(id)
      } else {
        const formData = this.formData()
        const dataId = formData.data ? formData.data.id : null
        if (dataId || !isSuccess(formData)) {
          this.initCreateForm && this.initCreateForm()
        }
      }
    },
    formData() {
      return {}
    },
    initEditForm() {
    },
    initCreateForm() {
    },
    validateEmail(rule, value, callback) {
      if (validateEmail(value)) {
        callback()
      } else {
        const msg = '请输入正确邮箱地址'
        callback([msg])
      }
    },
    validatePhone(rule, value, callback) {
      if (validatePhone(value)) {
        callback()
      } else {
        const msg = '请输入正确电话号码'
        callback([msg])
      }
    },
    validateMoney(rule, value, callback) {
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value == null || value == undefined || reg.test(value)) {
        callback()
      } else {
        const msg = '请输入正确金额，保留2位小数'
        callback([msg])
      }
    },
    validateNumber(digit) {
      return (rule, value, callback) => {
        var reg = new RegExp(`^[0-9]{${digit}}$`)
        if (reg.test(value)) {
          callback()
        } else {
          [
            callback([`请输入${digit}位数字`])
          ]
        }
      }
    },
    validateRequire(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        const msg = rule.field + '为必传项'
        callback([msg])
      } else {
        callback()
      }
    },
    validateRequired(field) {
      return {
        validator: (rule, value, callback) => {
          if (value === '' || value === undefined || value === null) {
            const msg = field + this.i18n('message.required')
            callback([msg])
          } else {
            callback()
          }
        }
      }
    },
    validateArrayRequire(field) {
      return {
        validator: (rule, value, callback) => {
          if (value === undefined || value === null || value.length <= 0) {
            const msg = field + this.i18n('message.required')
            callback([msg])
          } else {
            callback()
          }
        }
      }
    },
    submitData() {
      const data = this.formData().data
      return data
    },
    submit() {
      this.$refs.postForm.validate(valid => {
        console.log(valid)
        if (valid) {
          if (!this.formValidate()) {
            return
          }
          const data = this.submitData()
          // debugger
          // console.log(this.$route.params)
          const formContent = { id: this.$route.params.id, formContent: JSON.stringify(data.json) }
          
          console.log(formContent)
          console.log(data)
          fetchDataList(formContent, '/manage/applyForm/saveForm', 'POST').then(res => {
            console.log(res)
            this.$message({
              message: '保存表单成功,请点击右上角关闭当前页面',
              type: 'success'
            })
            // this.approvalList = res.data
          }).catch(err => {
            alert(111)
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    formCallback() {

    },
    formValidate() {
      return true
    },
    reset() {
      this.initCreateForm()
    },
    close() {
      const view = this.$route
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        const latestView = views.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
      })
      this.reset()
    },
    checkCloseOrSwitch() {
      const cachePags = this.$store.state.tagsView.visitedViews
      if (!cachePags || cachePags.length == 0) {
        return
      }
      let closed = true
      cachePags.forEach(page => {
        if (page.fullPath == this.routePath) {
          closed = false
          return
        }
      })
      if (closed) {
        this.reset()
      }
    }
  }
}
