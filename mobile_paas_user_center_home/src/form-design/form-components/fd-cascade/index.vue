<template>
  <fd-form-item class="fd-select" v-bind="elFormAttrs" :key="controlKey">
    <div class="flex-box" :class="{'fd-cascade-mobile':mobile}">
      <PlaceHolderSelect
        class="fd-cascade-item flex-grow-1"
        :value="value1"
        @input="input1"
        @reload="initOptions"
        :size="size"
        :options="options"
        :readonly="readonly"
        :keyProps="valueProp"
        :valueProps="valueProp"
        :labelProps="labelProp"
        :loading="loading"
        :error="error"/>

      <FdSelectPure
        class="fd-cascade-item flex-grow-1"
        :value="value2"
        @input="input2"
        :vo="vo"
        :data="data2"
        :config="config"
        :design="design"
        :mobile="mobile"/>

      <FdSelectPure
        class="fd-cascade-item flex-grow-1"
        v-if="data.cascade==3"
        :value="value3"
        @input="input3"
        :vo="vo"
        :data="data3"
        :config="config"
        :design="design"
        :mobile="mobile"/>
    </div>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
