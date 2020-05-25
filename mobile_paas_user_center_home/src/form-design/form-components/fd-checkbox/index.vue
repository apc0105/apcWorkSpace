<template>
  <fd-form-item v-bind="elFormAttrs">
    <el-checkbox-group :value="stateValue" @input="input" :placeholder="i18n(data.placeholder)"
                       :disabled="disabled" :readonly="readonly">
      <component
        :style="itemStyle"
        :is="itemType"
        v-for="item in options"
        :key="optionKey(item)"
        :label="optionValue(item)">
        {{optionLabel(item)}}
      </component>
    </el-checkbox-group>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
