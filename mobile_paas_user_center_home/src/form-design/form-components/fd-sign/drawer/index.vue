<template>
  <canvas
    id="canvas"
    :width="width"
    :height="height"
    @mousedown="canvasDown($event)"
    @mousemove="canvasMove($event)"
    @mouseup="canvasUp($event)"
    @mouseleave="canvasLeave($event)"
    ref="canvas">
    抱歉，您的浏览器不支持canvas元素
  </canvas>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
