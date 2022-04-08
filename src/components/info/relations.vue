<template>
  <div class="echartLayout">
    <div id="container" style="width:100%; height:300%; overflow:hidden;"></div>
  </div>
</template>

<script>
// import imgSrc from '../../assets/img/echar_person.png'
export default {
  name: 'personRelation',
  data () {
    return {
      myChart: null,
      chartData: [],
      chartLink: []
    }
  },
  mounted () {
    this.initEchart()
  },
  methods: {
    initEchart () {
      let dom = document.getElementById('container')
      this.myChart = this.$echarts.init(dom)
      this.chartData = this.dataEChart()
      this.chartLink = this.linkEChart()
      let option = {
        tooltip: {
          show: false
        },
        series: [
          {
            edgeLabel: {
              normal: {
                formatter: '{c}',
                show: true
              }
            },
            edgeSymbol: 'circle',
            force: {
              repulsion: 2000
            },
            layout: 'force',
            roam: true,
            itemStyle: {
              normal: {
                color: '#6495ED'
              },
              // 鼠标放上去有阴影效果
              emphasis: {
                shadowColor: '#3721db',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40
              }
            },
            label: {
              normal: {
                show: true
              }
            },
            // 头像
            // symbol:
            symbolSize: 46,
            type: 'graph',
            links: this.chartLink,
            data: this.chartData
          }
        ]
      }
      this.myChart.setOption(option)
      this.myChart.on('click', function (params) {
        console.log(params.data) // 获取点击的头像的数据信息
      })
    },
    /**
     * 数据集合
     */
    dataEChart () {
      let data = [
        {
          symbolSize: 76,
          symbol: 'image://' + require('@/assets/faces/1.jpeg'),
          id: '1'
        },
        {
          symbolSize: 76,
          symbol: 'image://' + require('@/assets/faces/2.jpeg'),
          id: '2'
        },
        {
          symbol: 'image://' + require('@/assets/faces/3.jpeg'),
          id: '3'
        },
        {
          symbol: 'image://' + require('@/assets/faces/4.jpeg'),
          id: '4'
        }
      ]
      return data
    },
    /**
     * 关系数据集合
     */
    linkEChart () {
      let dataLink = [
        { value: 'friend', source: '1', target: '2' },
        { value: 'friend', source: '1', target: '3' },
        { value: 'friend', source: '1', target: '4' },
        { value: 'friend', source: '2', target: '3' },
        { value: 'couple', source: '2', target: '4' },
        { value: 'friend', source: '3', target: '4' }
      ]
      return dataLink
    }
  }
}
</script>

<style scoped>

</style>
