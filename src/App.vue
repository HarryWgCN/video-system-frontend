<template>
  <div id="app">
    <el-row>
      <el-col :span="12" class="lightgreen-box">
        <el-row>
          <VideoPlayer @video-change-event='videoChange'></VideoPlayer>
        </el-row>
      </el-col>
      <el-col :span="12" class="orange-box">
        <el-row><Navmenu ref='navmenu' :videoNameData='videoName'></Navmenu></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navmenu from '@/components/navmenu.vue'
import VideoPlayer from '@/components/video_player.vue'
export default {
  name: 'App',
  components: {Navmenu, VideoPlayer},
  data () {
    return {
      videoName: 'harry'
    }
  },
  methods: {
    videoChange: function (event) {
      console.log(this)
      console.log('App caught video name change')
      this.videoName = event
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
