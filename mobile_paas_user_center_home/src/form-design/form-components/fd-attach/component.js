import FdFormItem from '../fd-form-item'
import FdControlMixins from '../fd-control-mixin'
import { getHeader } from '@/utils/flowrRequest'
import { checkResponse } from '@/utils/flowrRequest'
import { uploadUrl } from '@/utils/upload'

export default {
  name: 'fd-attach',
  mixins: [FdControlMixins],
  components: { FdFormItem },
  props: {
    value: [Array]
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    showFileList() {
      // if (this.data.attachImage == 1) {
      //   return false
      // }
      return true
    },
    fileList() {
      // console.log(this.value)
      return Array.isArray(this.value) ? this.value : []
    },
    uploadUrl() {
      return uploadUrl
      // return process.env.BASE_API + '/file/upload/image'
    },
    uploadHeader() {
      return getHeader()
    },
    uplodateData() {
      return { module: this.data.attachModule }
    },
    tipText() {
      return this.data.placeholder
    },
    uploadDisabled() {
      return Array.isArray(this.value) && this.value.length >= this.data.attachLimit
    },
    attachImageStyle() {
      const style = []
      style.push('width:' + this.attachImageWidth)
      style.push('height:' + this.attachImageHeight)
      return style.join(';')
    },
    showImagePlus() {
      return this.data.attachImage === 1 && !this.uploadDisabled &&
        this.data.attachImageDisplay === 'picture-card'
    },
    showUploadBtn() {
      return (this.data.attachImage === 0 || this.data.attachImageDisplay != 'picture-card') && !this.uploadDisabled
    },
    fileListType() {
      return this.data.attachImageDisplay
    },
    chooseMultiple() {
      if (this.data.attachLimit <= 1) {
        return false
      }
      return Array.isArray(this.value) ? this.data.attachLimit - this.value.length > 1 : true
    },
    attachClass() {
      if (this.uploadDisabled) {
        return 'attach-upload-disabled'
      }
    }
  },
  methods: {
    removeFile(file, fileList) {
      console.log(file, fileList)
    },
    uploadSuccess(res, file) {
      // debugger
      // console.log(res)
      // console.log(file)
      if (checkResponse(res)) {
        const newValue = Array.isArray(this.value) ? [...this.value] : []
        const imgArr = res.data.map(item => {
          return {
            name: item.fileName,
            id: item.id,
            url: item.fileName
          }
        })
        // console.log(imgArr)
        newValue.push(...imgArr)
        // console.log(newValue)
        this.input(newValue)
      } else {
        console.error(res)
        this.$message.error('上传失败')
      }
    },
    check(file) {
      if (this.data.attachImage === 1) {
        return this.checkImage(file)
      } else {
        return this.checkExt(file)
      }
    },
    checkExt(file) {

    },
    checkImage(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/svg+xml'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('只能是 JPG / PNG / SVG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('素材大小不能超过 2MB!')
      }
      const result = isJPG && isLt2M
      return result
    },
    handlePictureCardPreview(file) {
      if (this.data.attachImage === 1) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
}
