<template>
  <div class="form-container form-container-full" style="min-width: 1300px">
    <v-form :is-edit="isEdit" :is-copy="isCopy" :id="formId" ref="form" class="form-container-body"/>
    <div class="form-container-footer">
      <!-- <el-button @click="goBack">{{i18n('operation.cancel')}}</el-button> -->
      <el-button type="primary" :loading="isLoading(postForm)" @click="submit">{{i18n('operation.submit')}}
      </el-button>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
