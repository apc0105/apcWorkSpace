<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-date-picker
      :value="stateValue"
      @input="input"
      :placeholder="i18n(data.placeholder)"
      :disabled="disabled"
      :readonly="readonly"
      :type="data.dateType"
      :format="data.format"
      value-format="timestamp">
    </el-date-picker>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
