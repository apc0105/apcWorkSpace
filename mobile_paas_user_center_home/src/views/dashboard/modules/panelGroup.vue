<template>
  <a-row :gutter="25" class="panel-group">
    <a-col :span="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <a-icon type="car" theme="filled" class-name="card-panel-icon" style="font-size:40px;"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">车辆报警数</div>
          <count-to :start-val="0" :end-val="one" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </a-col>
    <a-col :span="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <a-icon type="smile" theme="filled" class-name="card-panel-icon" style="font-size:40px;"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">人脸报警数</div>
          <count-to :start-val="0" :end-val="two" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { findVehicleRecordNum } from '@/api/home'
import { getResidenceId } from '@/utils/auth'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      dropdownData: [],
      todoNum: null,
      id: '',
      one: null,
      two: null
    }
  },
  created () {
    this.getStandardInfoByDepIdCount()
  },
  methods: {
    getStandardInfoByDepIdCount () {
      return new Promise((resolve, reject) => {
        findVehicleRecordNum({ id: getResidenceId() }).then(response => {
          this.one = response.data[0].carCount
          this.two = response.param[0].userCount
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 10px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #ce5815;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #ce5815;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: none;
      text-align: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
<style>
.backlog span.dropdownAll {
  width: 250px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
}
.backlog .el-scrollbar__wrap {
  overflow-x: hidden;
  max-height: 300px;
  padding-bottom: 15px;
}
.backlog {
  max-height: 250px;
  overflow-y: auto;
}
</style>
