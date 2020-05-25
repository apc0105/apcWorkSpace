<template>
  <div class="clearfix fileList">
    <a-upload
      :action="`${uploadUrl}?enclosureId=111`"
      :headers="headers"
      :multiple="multiple"
      @preview="handlePreview"
      @change="handleChange"
    >
      <!-- <div v-if="fileList.length < len">
        <a-icon type="plus" />
        <div class="ant-upload-text"></div>
      </div> -->
      <a-button> <a-icon type="upload" /> 上传文件</a-button>
    </a-upload>
    <div class="fieldList">
      <div class="item" v-for="(item,index) in fileList" :key="item.uid">
        <div class="title">{{item.name}}.{{item.fileType}}</div>
        <div class="opt">
          <a-icon type="eye"  @click="handlePreview(item,index)" />
          <a-icon type="delete" @click="handleDel(item,index)" style="margin-left:8px"/>
        </div>
      </div>
    </div>
    <a-spin tip="上传中..." v-if="isDone" />
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import {previewBaseUrl} from '@/utils/upload'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import Vue from 'vue'
// import { baseUpload } from '@/utils/upload.js'
export default {
  data () {
    return {
      headers:{},
      previewVisible: false,
      previewImage: '',
      isDone:false,
      uploadUrl: '/jeecg-boot/file/uploadWithInputStream',
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ]
    }
  },
  props: {
    decorator: {
      type: Array,
      default: () => []
    },
    imgList: {
      type: Array,
      default: () => []
    },
    fieldName: {
      type: String,
      default: ''
    },
    len: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log(this.imgList)
    this.fileList = JSON.parse(JSON.stringify(this.imgList))
    // this.imgList
    // this.getfileList(this.projectId)
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {'X-Access-Token':token}
  },
  watch: {
    // imgList (newValue, oldValue) {
    //   console.log(newValue, oldValue)

    //   this.fileList = newValue
    //   // console.log(result)
    // }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      window.open(`${previewBaseUrl}${file.url}`)
    },
    handleDel(val,index){
      console.log(val,index)
      this.fileList.splice(index,1)
    },
    handleChange ({file, fileList }) {
      // console.log(fileList)
      this.isDone = true
      if(file.uid&&file.status==='done'){
        this.isDone = false
        console.log(file)
        console.log(fileList)
        this.fileList = fileList.map(item=>{
          let res = item.response.result
          if(item.response) return {
            uid: res.id,
            name: res.fileName,
            status: 'done',
            fileType:res.fileType,
            url: `${res.filePath}${res.id}.${res.fileType}`,
          }
          return item
        })
      }
      console.log(this.fileList)
      this.$emit('getPath',JSON.stringify(this.fileList), this.fieldName)
      // this.fileList = fileList.map(item=>{
      //   if(item.response)
      //   return{

      //   }
      // })
      // this.$emit('getPath', result, this.fieldName)
    }
  }

}
</script>
<style lang="scss" >
.fileList{
    .ant-upload-list{
      display: none !important;
    }
  }
</style>

<style lang="scss" scoped>
  .fieldList{
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      .title{
        // color: #48a2fc;
      }
      .opt{
        color: #48a2fc;
      }
      &:hover{
        background-color: #f8fdff;
      }
    }
  }
  
  
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
