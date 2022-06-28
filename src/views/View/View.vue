<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div id="main" style="width: 100%; height: 400px" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      list: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend:{
            data: ['销量','销量b']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "销量b",
            type: "bar",
            data: [52, 20, 46, 60, 30, 50],
          },
        ],
      },
    };
  },
  mounted() {
    var myChart = echarts.init(this.$refs.main);
    myChart.setOption(this.list);
  },
};
</script>

<style lang='scss' scoped>
</style>