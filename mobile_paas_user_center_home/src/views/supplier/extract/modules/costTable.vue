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
      <div style="color:#000;" id="printMe">
        <h2 style="text-align:center;font-size:24px;font-weight:500;padding:30px 0 60px;">造价审核机构抽取结果表</h2>
        <!-- <div style="float:right">填表日期： &emsp;&emsp;&emsp;&emsp;年 &emsp;&emsp;&emsp;月 &emsp;&emsp;&emsp;日</div> -->
        <table class="bids" style="margin-top:50px">
          <tr >
            <th width="100px">项目名称</th>
            <td colspan="4">{{ this.printData.proName }}</td>
          </tr>
          <tr>
            <th>实施部门</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>项目预算</th>
            <td colspan="4"></td>
          </tr>
          <tr >
            <th>抽取日期</th>
            <td colspan="4"></td>
          </tr>
          <tr>
            <th>联系人</th>
            <th>联系电话</th>
            <th colspan="2">单位名称</th>
            <th>跟进状态</th>
          </tr>
          <tr style="height:60px;">
            <td>{{ this.printData.man }}</td>
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
          <a-button type="primary" v-print="'#printMe'">打印</a-button>
        </a-col>
        <a-col :span="3" style="float:right;">
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    printData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      maskClosable: false,
      title: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    open () {
      this.title = '造价审核机构抽取结果表'
      this.visible = true
    }
  }
}
</script>
<style>
  .bids th, .bids td{border:1px solid #000;padding:10px 0;}
  .bids{margin-top:10px;}
  .bids th,.bids td{text-indent: 10px;}
  .centerT th, .centerT td{text-align: center}

</style>
