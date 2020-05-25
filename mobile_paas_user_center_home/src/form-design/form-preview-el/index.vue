<template>
  <div class="form-el fd-form-item" :style="formItemStyle">
    <div class="flex-box">
      <div class="fd-form-item-inner flex-grow-1" :style="formInnerStyle">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
