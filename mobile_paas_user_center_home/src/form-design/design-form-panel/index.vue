<template>
  <el-form
    :model="formData"
    :style="style"
    :size="size"
    :label-position="json.config.labelAlign"
    :label-width="json.config.labelWidth"
    :class="{'design-form-mobile':mobile,'design-form-pc':!mobile}"
    class="design-form">

    <!-- 表单标题 -->
    <form-design-el
      v-if="json.config.title"
      :index="-1"
      :mobile="mobile"
      :config="json.config"
      :data="titleConfig">
      <component is="fd-title" :data="titleConfig" v-model="json.config.title"/>
    </form-design-el>
    <!-- forEach 元素 -->
    <form-design-el
      v-for="(el,index) in json.elements" :key="el.id"
      v-if="el.shown==1 && !el.parentId"
      :active="isActiveEl(el)"
      :index="index"
      :mobile="mobile"
      :data="el"
      :config="json.config">
      <component :ref="el.id" :is="el.type" :data="el" v-model="formData[el.key]" :prop="el.key"
                 :mobile="mobile" design :json="json" :config="json.config"
                 :childElements="childElements(el)" :vo="formData"/>
    </form-design-el>

    <div class="form-el-drop-panel" :class="dropClass" v-el-dnd="dndDropData" v-on="dndAttr"></div>

  </el-form>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
