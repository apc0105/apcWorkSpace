<template>
  <el-table ref="table" :data="data" v-bind="$attrs" row-key="id"
            @selection-change="handleSelectionChange"
            @row-click="handleClickRow">

    <el-table-column type="selection" width="40" reserve-selection v-if="showSelection" :selectable="selectable"/>


    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <!--<span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>-->
        <!--<span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">-->
        <!--<i v-if="!scope.row._expanded" class="el-icon-plus"></i>-->
        <!--<i v-else class="el-icon-minus"></i>-->
        <!--</span>-->
        {{scope.$index}}
      </template>
    </el-table-column>

    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text"
                     :width="column.width">
      <template slot-scope="scope">
        <!--<span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>-->
        <!--<span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">-->
        <!--<i v-if="!scope.row._expanded" class="el-icon-plus"></i>-->
        <!--<i v-else class="el-icon-minus"></i>-->
        <!--</span>-->
        <span v-if="column.render"><column.render :data="scope.row"/></span>
        <span v-else>{{scope.row[column.value]}}</span>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
  import treeToArray from './eval'
  export default {
    name: 'treeTable',
    props: {
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
      showSelection: {
        type: Boolean,
        default: true
      },
      selectable: {
        type: Function,
        default: () => true
      }
    },
    computed: {},
    methods: {
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.children && record.children.length > 0)
      },
      handleSelectionChange(e){
        this.$emit('selection-change', e)
      },
      handleClickRow(e){
        this.$emit('row-click', e)
      },
      setCurrentRow(row){
        this.$refs.table.setCurrentRow(row)
      },
      clearSelection(){
        this.$refs.table.clearSelection()
      }
    }
  }
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
