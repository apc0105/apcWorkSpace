<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :headers="uploadHeader"
      :data="uplodateData"
      list-type="picture"
      :on-success="uploadSuccess"
      :before-upload="check"
      :show-file-list="false"
      :with-credentials="true"
      :disabled="disabled">
      <el-button v-if="button" type="primary" :size="buttonSize" icon="el-icon-upload">{{i18n('operation.uploadImage')}}
      </el-button>
      <div v-else>
        <div v-if="src" :class="className" :style="sizeStyle">
          <img class="upload-box-img" :src="src" :style="imageSizeStyle"/>
          <i class="el-icon-delete color-danger upload-box-delete" @click.stop="clear"/>
        </div>
        <div v-else :class="className" :style="sizeStyle">
          <i class="el-icon-plus" :style="iconSizeStyle"></i>
        </div>
      </div>
    </el-upload>
    <el-input v-if="showInput && !button" :placeholder="tipText" :value="src" @input="input"
              class="upload-box-input"></el-input>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
