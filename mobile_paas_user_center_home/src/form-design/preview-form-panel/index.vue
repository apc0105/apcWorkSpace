<template>
  <el-form
    ref="elForm"
    :model="formData"
    :size="size"
    :style="style"
    :label-position="json.config.labelAlign"
    :label-width="json.config.labelWidth"
    :class="{'design-form-mobile design-form-preview-mobile':mobile,'design-form-pc design-form-preview-pc':!mobile}"
    class="design-form design-form-preview">
    <!-- 表单标题 -->
    <component is="fd-title" :data="titleConfig" v-model="json.config.title" />
    <!-- forEach 元素 -->
    <form-preview-el
      v-for="(el,index) in json.elements"
      v-if="el.shown==1 && !el.parentId"
      :key="el.id"
      :mobile="mobile"
      :data="el">

      <component
        :is="el.type"
        :data="el"
        :mobile="mobile"
        :json="json"
        :config="json.config"
        v-model="formData[el.key]"
        :vo="formData"
        :childElements="childElements(el)"
        :prop="el.key"/>

    </form-preview-el>

  </el-form>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
