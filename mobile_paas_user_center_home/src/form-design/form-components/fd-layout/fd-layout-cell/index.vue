<template>
  <div class="fd-form-layout-cell" v-bind="layoutAttrs" :style="formItemStyle">
    <div :style="formInnerStyle">
      <component :is="el.type" :data="el" v-model="vo[el.key]" :prop="el.key" :mobile="mobile"
                 :design="design" v-if="showElement"/>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='../../fd-layout-design/fd-layout-cell/style.scss' rel='stylesheet/scss' lang='scss'></style>
