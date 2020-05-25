<template>
  <div :class="class1">
    <div v-if="error" class="api-component-inner">
      <div class="api-component-message">{{data.message}}</div>
      <el-button class="api-component-reload" @click="reloadClick" type="danger">重新加载</el-button>
    </div>
    <div v-else class="api-component-content">
      <div v-if="showEmpty && isEmpty && !loading" class="api-component-empty">{{i18n('message.emptytable')}}</div>
      <div v-if="showLoading && loading" class="api-component-loading" v-loading="loading"/>
      <slot/>
    </div>
  </div>
</template>
<script>
  import { isInit, isSuccess, isLoading, isError } from '@/store/stateUtil'
  export default{
    name: 'ApiComponent',
    props: {
      className: {
        type: String
      },
      reload: {
        type: Function,
        required: false
      },
      data: {
        required: true
      },
      showLoading: {
        type: Boolean,
        default: true
      },
      showEmpty: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      success() {
        return isSuccess(this.data)
      },
      loading() {
        return isLoading(this.data)
      },
      error() {
        return isError(this.data)
      },
      class1() {
        return 'api-component ' + this.className
      },
      isEmpty() {
        try {
          return this.data.data.dataList.length == 0
        } catch (e) {
          return true
        }
      }
    },
    methods: {
      reloadClick() {
        this.$emit('reload')
      }
    }

  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .api-component {
    height: 100%;
    &-inner {
      padding: 10px;
      text-align: center;
    }
    &-message {
      font-size: 13px;
      text-align: center;
      line-height: 1.5;
      padding: 8px 0;
    }
    &-reload {
      margin: 0px auto;
      vertical-align: middle;
      z-index: 9999;
      position: relative;
    }
    &-content {
      height: 100%;
      position: relative;
      text-align: center;
    }
  }
</style>
