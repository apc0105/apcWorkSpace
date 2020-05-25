<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-input
      :value="formatValue"
      :placeholder="i18n(data.placeholder)"
      :readonly="readonly" :disabled="true">
    </el-input>
    <div class="fd-number-cnytext" v-if="showCnyText" :style="cnyTextStyle">
      {{cnyText}}
    </div>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
