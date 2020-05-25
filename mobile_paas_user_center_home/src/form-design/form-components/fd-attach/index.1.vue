<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-upload
      :class="attachClass"
      :action="uploadUrl"
      :headers="uploadHeader"
      :data="uplodateData"
      :on-remove="removeFile"
      :on-success="uploadSuccess"
      :before-upload="check"
      :show-file-list="showFileList"
      :list-type="fileListType"
      :with-credentials="true"
      :disabled="uploadDisabled"
      :file-list="fileList"
      :multiple="chooseMultiple"
      :on-preview="handlePictureCardPreview">
      <el-button type="primary" :disabled="uploadDisabled" :size="size" v-if="showUploadBtn">
        {{_i18n_('operation.flow.formdesign.chooseFile')}}
      </el-button>
      <i v-if="showImagePlus" class="el-icon-plus"/>
    </el-upload>
    <el-dialog title="label.flow.formdesign.props.attachImagePreview" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
