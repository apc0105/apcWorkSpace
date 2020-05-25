<template>
  <el-form :model="activeEl" class="form-design-props-panel" label-position="right" label-width="90px">
    <div v-for="item in props" v-if="renderEl(item)">
      <component v-if="item.type=='prop-object'" :is="item.type" :data="item" v-model="activeEl" :vo="activeEl"
                 @input="inputProp" :field="item.key" :defobjectFields="defobjectFields" :json="json"
                 :config="propsConfig"/>

      <component v-else :is="item.type" :data="item" v-model="el[item.key]" :vo="activeEl" @input="inputProp"
                 :field="item.key" :config="propsConfig"/>
    </div>
  </el-form>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
