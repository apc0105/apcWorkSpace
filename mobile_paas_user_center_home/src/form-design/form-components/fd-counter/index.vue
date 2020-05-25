<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-input-number
      :value="formatValue"
      @input="input"
      :placeholder="i18n(data.placeholder)"
      :precision="data.digit"
      :min="data.min"
      :max="data.max"
      :step="data.step"
      :readonly="readonly"
      :disabled="disabled">
    </el-input-number>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
