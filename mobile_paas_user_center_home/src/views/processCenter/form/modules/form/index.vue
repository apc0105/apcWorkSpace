<template>
  <el-form :model="postForm" :rules="rules" :key="timestamp" ref="postForm" label-width="100px">

    <!-- <el-tabs :value="activeTab" @tab-click="handleClick">
      <el-tab-pane :label="i18n('label.flow.defform.tabs.basicInfo')" name="basic-info">
        <br/>
        <el-form-item :label="i18n('label.flow.defform.key')" class="mustinput" prop="key">
          <el-input v-model="keyValue" :placeholder="i18n('message.placeholder')" @input="inputKey">
            <template slot="prepend">{{keyFormat}}</template>
          </el-input>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.name')" class="mustinput" prop="name">
          <el-input v-model="postForm.name"></el-input>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.version')" prop="version">
          <el-input v-model="postForm.version" disabled/>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.desc')" prop="desc">
          <el-input type="textarea" :rows="3" autosize :placeholder="i18n('message.placeholder')"
                    v-model="postForm.desc">
          </el-input>
          <span class="word-counter" v-show="tipsLength">{{tipsLength}}  {{i18n('label.char')}}</span>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.status')" class="mustinput" prop="status">
          <el-radio-group v-model="postForm.status">
            <el-radio :label="1" name="status">{{i18n('operation.enable')}}</el-radio>
            <el-radio :label="0" name="status">{{i18n('operation.disable')}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.createTime')" prop="createTime">
          <el-date-picker v-model="postForm.createTime" type="datetime" value-format="timestamp"/>
        </el-form-item>

        <el-form-item :label="i18n('label.flow.defform.updateTime')" prop="updateTime">
          <el-date-picker v-model="postForm.updateTime" type="datetime" value-format="timestamp"/>
        </el-form-item>
      </el-tab-pane> -->
      <!-- 字段属性 -->
      <!-- <el-tab-pane :label="i18n('label.flow.defform.tabs.jsonInfo')" name="json-info">
        <div style="height: 600px;">
          <FormDesign v-model="postForm.json" :formId="id"/>
        </div>
      </el-tab-pane>
    </el-tabs> -->
    <div style="height: calc(100vh - 100px)">
          <FormDesign v-if="isShow" v-model="postForm.json" :initData="value" :formId="6666666666"/>
        </div>
  </el-form>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
