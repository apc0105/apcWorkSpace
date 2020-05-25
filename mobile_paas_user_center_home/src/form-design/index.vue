<template>
  <div class="form-design flex-box">

    <control-panel :value="json" @input="emitInput"/>

    <design-panel :value="json" @input="emitInput"/>

    <props-panel :value="json" @input="emitInput" :formId="formId"/>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
