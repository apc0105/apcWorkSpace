<template>
  <PlaceHolderSelect
    :value="stateValue"
    @input="input"
    @reload="initOptions"
    :options="options"
    :keyProps="valueProp"
    :valueProps="valueProp"
    :labelProps="labelProp"
    :loading="loading"
    :size="size"
    :readonly="readonly"
    :i18nLabel="data.i18nLabel==1"
    :error="error"/>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
