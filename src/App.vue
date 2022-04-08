<template>
  <div id="app">
    <!-- <el-container> -->
      <el-row>
        <el-col :span="12" class="lightgreen-box"><VideoPlayer></VideoPlayer></el-col>
        <el-col :span="12" class="orange-box">
          <el-row><Navmenu></Navmenu></el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Navmenu from '@/components/navmenu.vue'
import VideoPlayer from '@/components/video_player.vue'
export default {
  name: 'App',
  components: {Navmenu, VideoPlayer}
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
