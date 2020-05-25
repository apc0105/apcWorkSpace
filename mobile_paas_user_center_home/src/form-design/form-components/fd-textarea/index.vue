<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-input type="textarea" :value="stateValue" @input="input" :placeholder="i18n(data.placeholder)"
              :readonly="readonly" :disabled="disabled" :autosize="autosize">
    </el-input>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
