<template>
  <div>
    <el-tag v-for="el in elements" :key="el.name" class="form-design-item"
            @click="addElement(el.name)" v-el-dnd="dndDragData(el)">
      <svg-icon :icon-class="el.name" className="form-design-itemicon"/>
      {{i18n(el.text)}}
    </el-tag>
  </div>
</template>
<script src='./component.js'/>
