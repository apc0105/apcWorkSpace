<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import { findUserNum } from '@/api/home'
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '10px',
          y: 'center',
          data: ['常驻人员', '重点人员']
        },
        series: [
          {
            name: '人员数量',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
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
        findUserNum({ id: getResidenceId() }).then(response => {
          this.chart.setOption({ // 加载数据图表
            series: [{
              data: [{ value: response.data[0].popCount, name: '常驻人员' }, { value: response.data[0].akCount, name: '重点人员' }]
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
