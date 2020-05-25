<template>
  <div>
    <a-modal
      :title="title"
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel">
      <div style="color:#000;" id="printMes">
        <h2 style="text-align:center;font-size:24px;font-weight:500;padding:15px 0;">专家抽取结果表</h2>
        <table class="bids">
          <tr>
            <th width="120">项目名称：</th>
            <td colspan="4">{{ this.printData.proName }}</td>
          </tr>
          <tr>
            <th>招标类型：</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>招标方式：</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>实施部门：</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>评标开始日期：</th>
            <td colspan="2"></td>
            <th width="120">评标开始时间：</th>
            <td colspan="2"></td>
          </tr>
          <tr>
            <th>评标地点：</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>回避：</th>
            <td colspan="4" height="150"></td>
          </tr>
          <tr>
            <th>抽取条件：</th>
            <td colspan="4" height="150"></td>
          </tr>
          <tr class="centerT">
            <th>序号</th>
            <th>专家姓名</th>
            <th>工作单位</th>
            <th>评标专业</th>
            <th>跟进状态</th>
          </tr>
          <tr class="centerT">
            <td>1</td>
            <td>{{ this.printData.company }}</td>
            <td>{{ this.printData.man }}</td>
            <td>{{ this.printData.tel }}</td>
            <td>{{ this.printData.state }}</td>
          </tr>
        </table>
        <div style="margin-top:50px;margin-bottom:50px;">
          &emsp;&emsp;&emsp;实施部门抽取人：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          管理员：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;负责人：
        </div>
      </div>
      <a-row style="margin-top:10px;">
        <a-col :span="3" style="float:right;">
          <a-button type="primary" v-print="'#printMes'">打印</a-button>
        </a-col>
        <a-col :span="3" style="float:right;">
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import { print } from '@/api/supplier/extract/index'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: '',
      visible: false,
      printData: {},
      confirmLoading: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    open () {
      this.title = '项目抽取结果表'
      this.visible = true
      // this.$nextTick(() => {
      //   this._print()
      // })
    },
    _print () {
      return new Promise((resolve, reject) => {
        print({ id: this.id }).then(res => {
          this.printData = res.data
        })
      })
    }
  }
}
</script>
<style>
  .bids th, .bids td{border:1px solid #000;padding:10px 0;}
  .bids th{text-indent: 10px;}
  .bids{margin-top:10px;}
  .centerT th, .centerT td{text-align: center}
</style>
