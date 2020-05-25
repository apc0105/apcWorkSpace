<template>
  <div>
    <!-- <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSucess"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    <!-- </el-upload> -->
    <!-- <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-success="handleSucess"
      multiple
      :limit="3"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <!<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    <!-- </el-upload>  -->
    <el-upload
      class="upload-demo"
      drag
      :file-list="fileList"
      :on-success="handleSucess"
      :on-remove="handleRemove"
      :action="uploadUrl"
      :before-remove="beforeRemove"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { uploadUrl } from '@/utils/upload'
// import { fetchDataList } from '@/api/form'
export default {
  data() {
    return {
      uploadUrl,
      fileList: [
        // { name: 'food.jpeg', url: 'https://fuss10.el emecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      fileListArr: []
    }
  },
  props: {
    attachments: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.fileList = this.attachments
    console.log(this.attachments)
    // this.fileList = []
  },
  methods: {
    // 将附件信息传值到父组件
    submitUpload() {
      console.log(this.fileListArr)
      this.$emit('isShow', this.fileListArr)
      // fetchDataList({ 	}, `/process/apply`, 'POST').then(res => {
      // }).catch(err => {
      //   this.listLoading = false
      //   console.log(err)
      // })
      // this.$emit('submitUpload', '666')
    },
    handleRemove(file, fileList) {
    },
    // handlePreview(file) {
    //   console.log(file)
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    beforeRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      if (file.response) {
        const arr = this.fileListArr
        const id = file.response ? file.response.data[0].id : file.id
        const a = arr.filter(item => item.id !== id)
        console.log(a)
        this.fileListArr = a
        return true
      }
      this.$message('您没有权限删除此文件')
      return false
      // return this.$confirm(`确定移除 ${file.name}？`, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
      // return this.$confirm(`确定移除 ${file.name}？`)
      // const arr = this.fileListArr
      // const id = file.response ? file.response.data[0].id : file.id
      // const a = arr.filter(item => item.id !== id)
      // console.log(a)
      // console.log(file)
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSucess(response, file, fileList) {
      console.log(file)
      console.log(fileList)
      if (file.response) {
        // debugger
        const fileListArr = []
        fileList.forEach(item => {
          // debugger
          if (item.response) {
            fileListArr.push({ name: item.response.data[0].fileName, id: item.response.data[0].id, url: item.response.data[0].id, readonly: false, fileSize: item.response.data[0].fileSize })
          } else {
            fileListArr.push(item)
          }
        })
        console.log(fileListArr)
        this.fileListArr = fileListArr
      }
    }
  }
}
</script>

<style lang="scss">
.upload-demo{
  .el-upload-dragger {
    height: 90px;

    .el-icon-upload{
      font-size: 50px;
      color: #C0C4CC;
      margin: 5px 0 5px;
      line-height: 50px;
    }
  }
}

</style>