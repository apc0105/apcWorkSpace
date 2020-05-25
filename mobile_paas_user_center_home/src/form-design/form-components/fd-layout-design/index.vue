<template>
  <fd-form-item class="fd-form-layout" v-bind="elFormAttrs">
    <div class="fd-form-layout-inner flex-box" :class="{'flex-direction-column':mobile}" :style="boxStyle">
      <FdLayoutCell
        v-for="(item,index) in data.cellElement"
        :key="item.id||index"
        :index="index"
        :layoutData="data"
        :vo="vo"
        :config="config"
        :design="design"
        :mobile="mobile"
        :weightTotal="weightTotal()"
        :cellHeight="cellHeight"
        :cellConfig="item"
        :data="layoutCellData(item)"
        @click="activeElement"/>
    </div>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
