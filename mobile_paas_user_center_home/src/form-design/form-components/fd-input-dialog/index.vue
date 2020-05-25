<template>
  <fd-form-item v-bind="elFormAttrs">
    <input-dialog
      :value="stateValue"
      @input="input"
      :disabled="disabled"
      :readonly="readonly"
      :multiple="data.multiple==1"
      :title="i18n(data.datasourceTitle)"
      :table-component="data.datasource"/>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
