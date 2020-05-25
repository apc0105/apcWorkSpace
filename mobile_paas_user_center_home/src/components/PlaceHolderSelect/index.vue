<template>
  <div class="placeholder-select">
    <div v-if="error" @click="reload" class="select-load-error">
      <el-input readonly value="6666" :size="size"/>
    </div>
    <div v-else-if="loading" class="select-loading">
      <el-input readonly prefix-icon="el-icon-loading" :value="i18n('message.select.loading')" :size="size"/>
    </div>
    <el-select
      v-else
      v-model="val"
      :placeholder="i18n('message.placeholder')"
      :readonly="readonly"
      :disabled="readonly"
      @change="change"
      @input="input"
      clearable
      :size="size">
      <el-option v-if="renderAll" :label="i18n('label.all')" :value="null"/>
      <el-option
        v-if="options"
        v-for="item in options"
        :key="optionKey(item)"
        :label="i18nOptionLabel(optionLabel(item))"
        :value="optionValue(item)">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
  export default {
    name: 'PlaceHolderSelect',
    computed: {},
    watch: {
      value(val) {
        this.val = val
      }
    },
    data() {
      return {
        val: null
      }
    },
    props: {
      value: {
        type: [Number, String]
      },
      options: {
        type: Array
      },
      readonly: {
        type: Boolean,
        default: false
      },
      i18nLabel: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: true
      },
      error: {
        type: Boolean,
        default: true
      },
      renderAll: {
        type: Boolean,
        default: true
      },
      keyProps: {
        type: String,
        default: 'id'
      },
      labelProps: {
        type: String,
        default: 'name'
      },
      valueProps: {
        type: String,
        default: 'id'
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    mounted() {
      this.val = this.value
    },
    methods: {
      change(e) {
        this.val = e
        this.$emit('change', e)
      },
      input(e) {
        this.val = e
        this.$emit('input', e)
      },
      reload() {
        this.$emit('reload')
      },
      i18nOptionLabel(key) {
        if (this.i18nLabel) {
          return this._i18n_(key)
        }
        return key
      },
      optionKey(item) {
        return this.optionValue(item)
      },
      optionLabel(item) {
        if (typeof item === 'number' || typeof item === 'string') {
          return item
        }
        const label = item[this.labelProps || 'name']
        return this.i18n(label)
      },
      optionValue(item) {
        if (typeof item === 'number' || typeof item === 'string') {
          return item
        }
        const val = item[this.valueProps || 'id']
        return val
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss'>
  
  @import 'src/styles/const.scss';

  .select-load-error .el-input__inner {
    color: $color-danger;
    cursor: pointer;
    width: 195px;
  }

  .select-loading .el-icon-loading {
    color: $background-blur;
  }

  .select-loading .el-input__inner {
    color: $background-blur;
    width: 195px;
  }

  .placeholder-select .el-select {
    width: 100%;
  }

</style>

