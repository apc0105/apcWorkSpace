<template>
  <fd-form-item v-bind="elFormAttrs">
    <Tinymce :value="stateValue" @input="input" :readonly="readonly" :disabled="disabled" :height="data.height"/>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
