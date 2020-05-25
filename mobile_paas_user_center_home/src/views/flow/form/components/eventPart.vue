<template>
  <div>
    <el-row
      v-for="(item,key) in events"
      :key="`${key}`"
      style="border: 1px solid #eee;padding: 5px;border-radius: 5px;margin-bottom:10px"
    >
      <div>
        <el-col :span="20" style="
    border-right: 1px solid #eee;
    padding-right: 5px;
">
          <el-row style="padding-top:5px;">
            <el-col :span="24">
              <el-radio-group v-model="item.label" size="mini">
                <el-radio label="local">本地调用</el-radio>
                <el-radio label="remote">远程调用</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row style="padding-top:5px;">
            <el-col v-if="item.label==='local'" :span="24">
              <el-select v-model="item.value" placeholder="请选择" size="mini" style="width:100%">
                <el-option
                  v-for="it in eventList"
                  :key="it.value"
                  :label="it.label"
                  :value="it.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="item.label==='remote'" :span="24">
              <el-row>
                <el-col :span="12">
                  <el-select
                    v-model="item.value"
                    placeholder="请选择应用"
                    size="mini"
                    style="width:100%"
                    @change="(val)=>{appChange(val,item)}"
                  >
                    <el-option
                      v-for="it in appcfg.appList"
                      :key="it.id"
                      :label="it.appName"
                      :value="it.id"
                    >{{it.appName}}</el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select
                    v-model="item.toAppCode"
                    placeholder="请选择接口"
                    size="mini"
                    style="width:100%"
                  >
                    <el-option
                      v-for="it in item.options"
                      :key="it.id"
                      :label="it.name"
                      :value="it.id"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="and-del-btn">
          <i class="el-icon-circle-plus-outline" style="color:#1890ff" @click="add" />
          <i class="el-icon-remove-outline" style="color:red" @click="del(key)" />
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import {elMixin} from '../../el-mixin'
export default {
  name: 'EventPartComponents',
  mixins:[elMixin],
  props: {
    appcfg: {
      type: Object,
      required: true
    },
    eventList: {
      required: true,
      type: Array
    },
    events: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    uniqueKey: function() {
      return new Date().getTime()
    }
  },
  methods: {
    add() {
      this.events.push({
        label: 'local',
        value: '',
        toAppCode: '',
        options: []
      })
    },
    del(index) {
      if (this.events.length === 1) return
      this.events.splice(index, 1)
    },
    appChange(val, node) {
      this.options = []
      const tempApp = this.appcfg.appList.find(item => item.id === val)
      node.options = this.appcfg.ifsList.filter(
        item => item.appCode === tempApp.appCode
      )
      node.toAppCode = ''
    }
  }
}
</script>
<style>
.and-del-btn {
  padding-top: 22px;
  text-align: center;
  color: #999;
}
</style>
