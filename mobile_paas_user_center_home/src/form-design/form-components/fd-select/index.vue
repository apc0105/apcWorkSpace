<template>
  <fd-form-item class="fd-select" v-bind="elFormAttrs" :key="controlKey">
    <FdSelectPure
      :value="stateValue"
      @input="input"
      :vo="vo"
      :data="data"
      :prop="prop"
      :config="config"
      :design="design"
      :mobile="mobile"/>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
