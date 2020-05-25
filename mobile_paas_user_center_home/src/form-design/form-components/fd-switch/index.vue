<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-switch :value="stateValue" @input="input" :active-value="activeValue" :inactive-value="inactiveValue"
               active-color="#13ce66" inactive-color="#ff4949" :readonly="readonly" :disabled="disabled"/>
    <span class="el-switch-tip">{{stateText}}</span>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
