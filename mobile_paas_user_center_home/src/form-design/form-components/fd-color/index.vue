<template>
  <fd-form-item v-bind="elFormAttrs">
      <el-color-picker :value="stateValue" @input="input" :show-alpha="alpha" :readonly="readonly"
                       :disabled="disabled"/>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
