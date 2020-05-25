<template>
  <fd-form-item v-bind="elFormAttrs">
      <el-radio-group :value="stateValue" @input="input" :placeholder="i18n(data.placeholder)" :readonly="readonly"
                      :disabled="disabled">
        <component
          :style="itemStyle"
          :is="itemType"
          v-for="item in options"
          :key="optionKey(item)"
          :label="optionValue(item)">
          {{optionLabel(item)}}
        </component>
      </el-radio-group>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
