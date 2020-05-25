<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import { findEquimentCount } from '@/api/home'
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
      default: '100%'
    },
    height: {
      type: String,
      default: '223px'
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
        legend: {
          data: ['在线', '不在线'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['球机', '枪机', '抓拍机'],
            axisTick: {
              alignWithLabel: true
            }
            // axisLabel: {
            //   formatter: '{value} 月'
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 个'
            }
          }
        ],
        series: [
          {
            name: '在线',
            type: 'bar',
            barWidth: '30%',
            data: [10, 52, 200]
          },
          {
            name: '不在线',
            type: 'bar',
            barWidth: '30%',
            data: [10, 100, 200]
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
        findEquimentCount({ id: getResidenceId() }).then(response => {
          this.chart.setOption({ // 加载数据图表
            xAxis: {
              data: response.data[0]
            },
            series: [{
              data: response.data[1]
            },
            {
              data: response.data[2]
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
