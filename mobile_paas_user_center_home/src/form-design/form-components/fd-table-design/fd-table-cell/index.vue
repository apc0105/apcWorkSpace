<template>
  <div class="fd-form-table-cell" v-bind="layoutAttrs" :style="formItemStyle" @click.stop="activeElement"
       v-el-dnd="dndDropData" :class="classObject" v-on="dndAttr" >
    <div class="fd-form-table-cell-empty" v-if="showEmptyTip" >
      {{_i18n_('message.flow.formdesign.emptycell')}}
    </div>
    <div v-if="showElement" @click.stop="activeElement" :style="formInnerStyle">
      <component :is="el.type" :data="el" v-model="vo[el.key]" :prop="tableRowProp(el.key)" :mobile="mobile"
                 :design="design" @input="inputTableCell"/>

    </div>
    <div v-if="showElement && design" class="fd-form-table-cell-tool" @click="deleteCellElement">
      <i class="el-icon-delete"/>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
