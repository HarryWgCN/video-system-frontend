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
      srcs: [],
      loading: true
    }
  },
  props: {
    processId: {
      type: Number,
      required: true // 缺失，控制台报错
    }
  },
  watch: {
    processId: function () {
      console.log('processId changed')
      this.forMounted()
    }
  },
  methods: {
    forMounted: function () {
      this.loading = true
      var this_ = this
      this.srcs = []
      this_.$axios.get('/video/' + this_.processId + '/face_cluster', {responseType: 'json'}).then(function (response) {
        if (response.data.code === '404') {
          return
        }
        for (var element of response.data.data) {
          var temp = 'data:image/jpg;base64,' + element.content
          this_.srcs.push(temp)
        }
        this_.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.forMounted()
  }
}
</script>

<style>
  .block {
    height: 100%;
    width: 100%;
  }
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
