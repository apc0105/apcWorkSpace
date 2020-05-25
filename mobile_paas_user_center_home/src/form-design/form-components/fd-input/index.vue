<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-input :value="formatValue" @input="_input" :placeholder="i18n(data.placeholder)"
              :readonly="readonly" :disabled="disabled" @focus="_focus" @blur="_blur">
      <span slot="prepend" v-if="prefix">{{prefix}}</span>
      <span slot="append" v-if="suffix">{{suffix}}</span>
    </el-input>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
