<template>
  <div class="form-props-object">
    <div class="form-props-title flex-box" v-if="showLabel" @click="toggleVisible">
      <div class="flex-grow-1">
        {{i18n(data.name)}}
      </div>
      <div class="form-props-explain">
        <i v-if="data.visible" class="el-icon-arrow-down"/>
        <i v-else class="el-icon-arrow-right"/>
      </div>
    </div>
    <div class="form-props-panel" :class="{'active':visible}">
      <form-preview-el
        v-for="(el,index) in props"
        :key="el.id"
        v-if="renderEl(el)"
        :data="el">
        <component :is="el.type" :data="el" v-model="value[el.key]" @input="val=>input(el.key,val)"
                   :vo="value" :field="el.key" :prop="el.key"
                   :defobjectFields="defobjectFields" :json="json" :config="config"/>
      </form-preview-el>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
