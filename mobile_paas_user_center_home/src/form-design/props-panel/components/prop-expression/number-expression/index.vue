<template>
  <div class="expression-panel">
    <el-form-item :label="i18n('label.flow.formdesign.props.expressionField')">
      <el-tag
        v-for="item in watchFields"
        :class="{'expression-item':true,'disabled':disabledField}"
        :key="item.id"
        @click="addField(item)">
        {{item.name}}
      </el-tag>
    </el-form-item>

    <el-form-item :label="i18n('label.flow.formdesign.props.expressionConst')">
      <div class="flex-box">
        <el-input :placeholder="i18n('placeholder.flow.formdesign.expressionConst')"
                  v-model="inputConst" :disabled="disabledConst"
                  style="width:180px;margin-right: 16px;"/>
        <el-button @click="addConst" :disabled="disabledConst">{{i18n('operation.ok')}}</el-button>
      </div>
      <div class="color-danger" v-if="inputConstError">{{i18n('message.flow.formdesign.expressionConst')}}</div>
    </el-form-item>

    <el-form-item :label="i18n('label.flow.formdesign.props.expressionOperator')">
      <el-tag
        v-for="item in operators"
        :class="{'expression-item':true,'disabled':disabledOperator(item)}"
        :key="item"
        @click="addOperator(item)">
        {{item}}
      </el-tag>
    </el-form-item>

    <el-form-item :label="i18n('label.flow.formdesign.props.expressionDisplay')">
      <div>
        <el-button @click="popItem" size="mini">{{i18n('operation.flow.formdesign.expressionPop')}}</el-button>
        <el-button @click="clearItem" size="mini">{{i18n('operation.flow.formdesign.expressionClear')}}</el-button>
        <el-button @click="handleInputJson" size="mini" :type="inputModel?'primary':null">
          {{i18n('operation.flow.formdesign.expressionJson')}}
        </el-button>
      </div>
      <el-input v-if="inputModel" type="textarea" rows="{min:5}" v-model="inputJson"/>
      <el-input v-else type="textarea" rows="{min:5}" readonly :value="expressText()"/>
    </el-form-item>

  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
