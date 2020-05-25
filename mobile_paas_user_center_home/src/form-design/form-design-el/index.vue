<template>
  <div class="form-el fd-form-item" :style="formItemStyles()" @click.stop="activeElement"
       v-el-dnd="dndDropData" :class="classObject" v-on="dndAttr">

    <div class="form-el-border-top"/>
    <div class="form-el-border-bottom"/>
    <div class="form-el-border-left"/>
    <div class="form-el-border-right"/>

    <div v-if="data.id" class="form-el-tool">
      <div class="form-el-merge" v-if="isGridLayout" @click.stop="mergeGrid"
           :class="{'form-el-merge-active':mergeFlag}">
        <svg-icon icon-class="grid"/>
      </div>
      <div class="form-el-drag" v-if="isLayout" ref="dragSource">
        <svg-icon icon-class="drag"/>
      </div>
      <div class="form-el-delete" @click.stop="deleteElement" v-if="!isConfig">
        <i class="el-icon-delete"/>
      </div>
    </div>

    <div class="flex-box">
      <div class="fd-form-item-inner flex-grow-1" :style="formInnerStyles()">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
