<template>
  <div class="form-design-mobile">
    <div class="form-design-screen-top"><span class="form-design-screen-top-bg"></span></div>
    <div class="form-design-screen" :style="pageStyle"
         :class="{'form-design-screen-scroll':screenScroll,'form-design-screen-fixed flex-box flex-direction-column':pageFixed}">
      <div class="form-el-panel" :class="{'flex-grow-1':json.config.fixed}"
           style="overflow-y:auto;overflow-x:hidden;">

        <design-form-panel :value="value" @input="emitInput" :activeEl="activeEl" :formData="formData" mobile/>

      </div>
    </div>
    <div class="form-design-screen-footer"><span class="form-design-screen-footer-bg"></span></div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
