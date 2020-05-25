<template>
  <div v-if="model">
    <el-row>
      <el-col :span="6">
        <div class="flow-form-label">节点名称</div>
      </el-col>
      <el-col :span="18">
        <el-input v-model="model.label" placeholder="请输入节点名称" size="mini" />
      </el-col>
    </el-row>
    <!-- <el-row style="padding-top:5px;">
      <el-col :span="6">
        <div class="flow-form-label">描述</div>
      </el-col>
      <el-col :span="18">
        <el-input v-model="model.desc" type="textarea" :rows="2" placeholder="请输入节点描述" />
      </el-col>
    </el-row>-->
    <form-role
      v-if="formRole && formRole.length >0"
      :form-data-list="formRole"
      @changeFormRole="changeFormRole"
    />
  </div>
</template>

<script>
import {elMixin} from '../../el-mixin'
import FormRole from './formRole'
export default {
  name: 'NodeLabel',
  mixins:[elMixin],
  components: {
    FormRole
  },
  props: {
    formDataList: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    graph: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: null
    }
  },
  watch: {
    item: function(val, oldVal) {
      if (val !== oldVal) {
        this.init()
      }
    },
    'model.label': function(val) {
      this.labelChange(val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.model = this.data.model
      const formRole = JSON.parse(JSON.stringify(this.formDataList))
      if (!this.model.formRole) {
        this.formRole = formRole.map(item => {
          return Object.assign({}, item, { value: 'readonly' })
        })
        this.model.formRole = JSON.parse(JSON.stringify(this.formRole))
      } else {
        const modelFormRoleList = JSON.parse(
          JSON.stringify(this.model.formRole)
        )
        this.formRole = formRole
          .map(item => {
            const tempRole = modelFormRoleList.find(it => it.key === item.key)
            if (tempRole) {
              return Object.assign({}, { ...item }, { ...tempRole })
            } else {
              item.value = 'readonly'
              return item
            }
          })
          .filter(it => it != null)
      }
    },
    labelChange(val) {
      this.graph.update(this.data, {
        label: val
      })
    },
    changeFormRole(formRole) {
      this.model.formRole = JSON.parse(JSON.stringify(formRole))
    }
  }
}
</script>

<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 14px;
}
</style>
