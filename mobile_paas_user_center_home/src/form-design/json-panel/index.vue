<template>
  <div class="form-design-json">
    <div class="json-btns">
      <el-button type="primary" size="mini" @click="importJson">
        {{i18n('operation.flow.flowdesign.importjson')}}
      </el-button>
    </div>
    <JsonEditor v-model="jsonValue"/>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
