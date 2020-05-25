<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel">
      <div style="color:#000;" id="printMes">
        <h2 style="text-align:center;font-size:24px;font-weight:500;padding:30px 0 60px;">招标代理机构抽取结果表</h2>
        <!-- <div style="float:right">填表日期： &emsp;&emsp;&emsp;&emsp;年 &emsp;&emsp;&emsp;月 &emsp;&emsp;&emsp;日</div> -->
        <table class="bids" style="margin-top:50px">
          <tr>
            <th width="150">项目名称</th>
            <td colspan="4">{{ this.printData.proName }}</td>
          </tr>
          <tr >
            <th>招标类型</th>
            <td colspan="2"></td>
            <th width="200">招标方式</th>
            <td colspan="2"></td>
          </tr>
          <tr>
            <th>项目实施部门</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>抽取日期</th>
            <td colspan="2"></td>
            <th width="110">评标地点</th>
            <td colspan="2"></td>
          </tr>
          <tr class="centerT">
            <th>联系人</th>
            <th>联系电话</th>
            <th colspan="2">单位名称</th>
            <th>跟进状态</th>
          </tr>
          <tr class="centerT" style="height:70px;">
            <td >{{ this.printData.man }}</td>
            <td>{{ this.printData.tel }}</td>
            <td colspan="2">{{ this.printData.company }}</td>
            <td>{{ this.printData.state }}</td>
          </tr>
        </table>
        <div style="margin-top:100px;margin-bottom:50px;display:flex;justify-content:space-around;align-content:flex-end;">
          实施部门抽取人：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          管理员：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;负责人：
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
      maskClosable: false,
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
      this.title = '招标代理机构抽取结果表'
      this.visible = true
      this.$nextTick(() => {
        this._print()
      })
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
  .bids th{text-indent:inherit;text-align: center;}
  .bids{margin-top:10px;}
  .centerT th, .centerT td{text-align: center}
</style>
