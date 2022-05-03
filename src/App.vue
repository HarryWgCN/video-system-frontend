<template>
  <div id="app">
    <el-row>
      <el-col :span="12" class="lightgreen-box">
        <el-row>
          <VideoPlayer @process-change-event='processChange' @video-seconds-change-event='videoSecondsChange'></VideoPlayer>
        </el-row>
      </el-col>
      <el-col :span="12" class="orange-box">
        <el-row><Navmenu :processId='processId' :videoSeconds='videoSeconds'></Navmenu></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navmenu from '@/components/navmenu.vue'
import VideoPlayer from '@/components/videoPlayer.vue'
export default {
  name: 'App',
  components: {Navmenu, VideoPlayer},
  data () {
    return {
      processId: 0,
      videoSeconds: 0
    }
  },
  methods: {
    processChange: function (event) {
      console.log('App caught video name change')
      this.processId = event.id
    },
    videoSecondsChange: function (event) {
      console.log('App caught video seconds change')
      this.videoSeconds = event
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
