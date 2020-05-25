<template>
  <div class="fd-form-table-cell fd-form-table-header" @click.stop="activeElement"
       v-el-dnd="dndDropData" :class="dropClass"
       @dragStart.stop="dragStart" @dragOver="dragOver" @dragLeave="dragLeave"
       @dragEnd="dragEnd" @dragDrop="dragDrop" @dragMove="dragMove">
    <slot/>
  </div>
</template>
<script src='./component.js'/>
<style src='../fd-table-cell/style.scss' rel='stylesheet/scss' lang='scss'></style>
