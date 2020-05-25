<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import { findCarNum } from '@/api/home'
import { getResidenceId } from '@/utils/auth'
require('echarts/theme/macarons')

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '88%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null,
      id: '',
      name: [],
      count: [],
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['常驻车辆', '重点车辆'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '车辆数量',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },
  created () {
    this.getEcharts()
  },
  mounted () {
    this.chart = echarts.init(this.$el, 'macarons')
    this.chart.setOption(this.options)
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getEcharts () {
      this.loading = true
      return new Promise((resolve, reject) => {
        findCarNum({ id: getResidenceId() }).then(response => {
          this.chart.setOption({ // 加载数据图表
            series: [{
              data: [response.data[0].resCount, response.data[0].monCount]
            }]
          })
          this.loading = false
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    }
  }
}
</script>
