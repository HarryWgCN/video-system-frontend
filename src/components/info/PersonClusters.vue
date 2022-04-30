<template>
  <div class="block" v-loading="loading">
    <el-carousel>
      <el-carousel-item v-for="src in srcs" :key="src.name">
        <el-image class='item' :src="src"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      srcs: [

      ],
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
  methods: {
    forMounted: function () {
      this.loading = true
      var this_ = this
      this.srcs = []
      this_.$axios.get('/ls', {
        params: {
          dirPath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/for_frontend/face_cluster'
        }
      }).then(function (response) {
        if (response.data.code === '404') {
          return
        }
        let asyncFun = []
        for (var element of response.data.data) {
          asyncFun.push(this_.getSingleCluster(element))
        }
        Promise.all(asyncFun).then(() => {
          console.log('complete')
          this_.loading = false
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    getSingleCluster: function (element) {
      var this_ = this
      return new Promise((resolve, reject) => {
        this_.$axios.get('/file', {
          params: {
            filePath: '/2020110710/video_system/' + this_.videoName + '/process_results/process/for_frontend/face_cluster/' + element.name
          },
          responseType: 'arraybuffer'
        }).then(function (response) {
          this_.srcs.push('data:image/jpg;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')))
          resolve()
        }).catch(function (error) {
          console.log(error)
        })
      })
    }
  },
  mounted: function () {
    this.forMounted()
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    overflow: auto;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
