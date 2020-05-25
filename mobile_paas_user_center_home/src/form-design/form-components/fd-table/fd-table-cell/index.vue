<template>
  <div class="fd-form-table-cell" v-bind="layoutAttrs" :style="formItemStyle">
    <div :style="formInnerStyle">
      <component :is="el.type" :data="el" v-model="vo[el.key]" :prop="tableRowProp(el.key)" :mobile="mobile"
                 :design="design" v-if="showElement" @input="inputTableCell"/>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='../../fd-table-design/fd-table-cell/style.scss' rel='stylesheet/scss' lang='scss'></style>
