<template>
  <div class="echartLayout" v-loading='loading'>
    <div id="container" style="width:100%; height:300%; overflow:hidden;"></div>
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
      chartLink: [],
      videoSeconds: 300,
      loading: true
    }
  },
  props: {
    videoName: {
      type: String,
      required: true // 缺失，控制台报错
    }
  },
  watch: {
    videoName: function () {
      console.log('videoName changed')
      this.forMounted()
    }
  },
  mounted: function () {
    this.forMounted()
  },
  methods: {
    forMounted: function () {
      var this_ = this
      this_.loading = true
      this.chartData = []
      this.chartLink = []
      this_.$axios.get('/ls', {
        params: {
          dirPath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/for_frontend/face_cluster'
        }
      }).then(function (response) {
        let asyncFun = []
        var facesArray = response.data.data
        console.log(facesArray)
        for (var i = 0; i < facesArray.length; i++) {
          var element = facesArray[i]
          asyncFun.push(this_.getSingleFace(element))
        }
        var index = 0
        Promise.all(asyncFun).then(() => {
          this_.$axios.get('/file', {
            params: {
              filePath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/relation/second_to_situation.json'
            }
          }).then(function (response) {
            // video seconds corresponding link number
            var secondToSituation = response.data
            var keyArray = []
            function func (a, b) {
              return a - b
            }
            for (let key in secondToSituation) {
              keyArray.push(key)
            }
            keyArray = keyArray.sort(func)
            for (var i = 0; i < keyArray.length; i++) {
              if (keyArray[i] > this_.videoSeconds) {
                index = i === 0 ? 0 : i - 1
                break
              }
            }
            index = keyArray.length - 1
            // get corresponding link.json
            this_.$axios.get('/file', {
              params: {
                filePath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/relation/link' + secondToSituation[keyArray[index]] + '.json'
              }
            }).then(function (response) {
              this_.chartLink = response.data
              this_.initEchart()
              this_.loading = false
            }).catch(function (error) {
              console.log(error)
            })
          }).catch(function (error) {
            console.log(error)
          })
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    getSingleFace: function (element) {
      var this_ = this
      return new Promise((resolve, reject) => {
        this_.$axios.get('/file', {
          params: {
            filePath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/for_frontend/face_cluster/' + element.name
          },
          responseType: 'arraybuffer'
        }).then(function (response) {
          var imageName = response.config.params.filePath.split('/')[response.config.params.filePath.split('/').length - 1]
          var id = imageName.split('.')[0]
          var image = 'data:image/jpg;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          this_.chartData.push({symbolSize: 76, symbol: `image://${image}`, id: id})
          resolve()
        }).catch(function (error) {
          console.log(error)
        })
      })
    },
    refresh: function () {
      this.initEchart()
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
    }
  }
}
</script>

<style scoped>

</style>
