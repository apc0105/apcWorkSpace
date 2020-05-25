<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import { findDeviceCount } from '@/api/home'
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
      default: '215px'
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '10px',
          y: 'center',
          textStyle: {
            color: '#fff'
          },
          data: ['摄像头', '烟感', 'WIFI', 'RFID']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['60%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '摄像头' },
              { value: 310, name: '烟感' },
              { value: 234, name: 'WIFI' },
              { value: 135, name: 'RFID' }
            ]
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
        findDeviceCount({ id: getResidenceId() }).then(response => {
          this.chart.setOption({ // 加载数据图表
            legend: {
              data: response.data[0]
            },
            series: [{
              data: response.data[1]
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
