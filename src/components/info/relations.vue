<template>
  <div class="echartLayout" v-loading='loading'>
    <div id="container" style="width:100%; height:500px; overflow:hidden;"></div>
    <!-- <button v-on:click='refresh()'>refresh</button> -->
  </div>
</template>

<script>
export default {
  name: 'personRelation',
  data () {
    return {
      myChart: null,
      chartData: [],
      overallChartLink: {},
      secondToSituationDict: {},
      chartLink: [],
      loading: true
    }
  },
  props: {
    processId: {
      type: Number,
      required: true // 缺失，控制台报错
    },
    videoSeconds: {
      type: Number,
      required: true
    }
  },
  watch: {
    processId: function () {
      console.log('processId changed')
      this.getClusterAndOverallRelations()
    },
    videoSeconds: function () {
      this.updateRelations()
    }
  },
  mounted: function () {
    this.getClusterAndOverallRelations()
  },
  methods: {
    getClusterAndOverallRelations: function () {
      var this_ = this
      this_.loading = true
      this.chartData = []
      this.chartLink = []
      this_.$axios.get('/video/' + this_.processId + '/face_cluster', {responseType: 'json'}).then(function (response) {
        if (response.data.code === '404') {
          return
        }
        for (var element of response.data.data) {
          var id = element.name.split('.')[0]
          var img = 'data:image/jpg;base64,' + element.content
          this_.chartData.push({symbolSize: 76, symbol: `image://${img}`, id: id})
        }
        this_.$axios.get('/video/' + this_.processId + '/relation', {responseType: 'json'}).then(function (response) {
          this_.overallChartLink = response.data.data.relationMap
          this_.secondToSituationDict = response.data.data.sec2situationMessage
          this_.updateRelations()
        }).catch(function (error) {
          console.log(error)
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateRelations: function () {
      this.loading = true
      var index = this.getCorrespondingRelationIndex(this.videoSeconds)
      console.log(index)
      this.chartLink = this.overallChartLink[index]
      console.log(this.chartLink)
      this.initEchart()
      this.loading = false
    },
    getCorrespondingRelationIndex: function (videoSeconds) {
      var keyArray = []
      function func (a, b) {
        return a - b
      }
      for (let key in this.overallChartLink) {
        keyArray.push(key)
      }
      keyArray = keyArray.sort(func)
      for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i] > videoSeconds) {
          return i === 0 ? 0 : i - 1
        }
      }
      return keyArray.length - 1
    },
    initEchart () {
      let dom = document.getElementById('container')
      this.myChart = this.$echarts.init(dom)

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
            symbolSize: 3,
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
    }
  }
}
</script>
  .echartLayout {
    height: 600px
  }
  .el-carousel__container {
    height: 600px
  }
<style scoped>

</style>
