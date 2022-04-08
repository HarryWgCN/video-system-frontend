<template>
  <div>
    <el-row>
      <el-col :span="12" class="lightgreen-box"><VideoPlayer></VideoPlayer></el-col>
      <el-col :span="12" class="orange-box">
        <Navmenu></Navmenu>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
import Navmenu from '@/components/navmenu.vue'
import VideoPlayer from '@/components/video_player.vue'
export default {
  name: 'Main',
  components: {Navmenu, VideoPlayer}
}
</script>

<style>

</style>
