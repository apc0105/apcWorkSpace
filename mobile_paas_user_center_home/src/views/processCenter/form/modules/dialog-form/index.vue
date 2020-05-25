<template>
  <el-dialog :title="i18n('label.flow.defform.module')" :visible="true" class="window-right-dialog" @close="close"
             width="1500px">
    <v-form is-edit :id="id" ref="form" class="window-right-dialog-form"/>
    <div slot="footer">
      <el-button @click="close">{{i18n('operation.cancel')}}</el-button>
      <el-button type="primary" :loading="isLoading(postForm)" @click="submit">{{i18n('operation.submit')}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
