<template>
  <div class="form-design-tool">
    <el-tag @click="clearJson">
      {{i18n('operation.flow.formdesign.clearjson')}}
    </el-tag>
    <el-tag @click="preview()">
      {{i18n('operation.flow.formdesign.previewPc')}}
    </el-tag>
    <el-tag @click="previewPhone(true)">
      {{i18n('operation.flow.formdesign.previewMobile')}}
    </el-tag>

    <el-dialog v-if="previewMobile" visible class="mobile-preview-dialog" width="480px" append-to-body
               @close="closePreview">
      <PreviewMobilePanel :value="value" :formData="formData" @close="closePreview"/>
    </el-dialog>

    <el-dialog v-if="previewPc"
               visible
               class="preview-dialog"
               :width="dialogWidth"
               :show-close="false"
               @close="closePreview" append-to-body>
      <PreviewFormPanel
        :value="value"
        :formData="formData"
        ref="designForm"/>
      <div slot="footer">
        <el-button @click="closePreview">{{i18n('operation.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{i18n('operation.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src='./component.js'/>
