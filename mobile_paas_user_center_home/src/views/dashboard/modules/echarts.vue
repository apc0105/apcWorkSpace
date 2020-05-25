<template>
  <a-row :gutter="24">
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card :loading="loading" :bordered="false" title="常驻车辆、重点车辆统计" :style="{ marginTop: '24px'}">
        <car/>
      </a-card>
    </a-col>
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="常驻人员、重点人员统计" :style="{ marginTop: '24px'}">
        <person/>
      </a-card>
    </a-col>
  </a-row>
  </div>
</template>
<script>
import car from './echarts/car'
import person from './echarts/person'
export default {
  components: {
    car,
    person
  }
}
</script>
