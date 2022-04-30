<template>
  <div>
    <el-dropdown @command="handleCommand" id='drop_down'>
      <span class="el-dropdown-link">
        {{selectVideoName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(video) in videoList" :key="video.name" :command="video.name.split('.')[0]">
          {{video.name.split('.')[0]}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      videoList: [],
      selectVideoName: ''
    }
  },
  mounted: function () {
    var this_ = this
    this.$axios.get('/ls-with-content', {
      params: {
        dirPath: '/2020110710/video_system/videos'
      }
    }).then(function (response) {
      this_.videoList = response.data.data
      this_.selectVideoName = this_.videoList[0].name.split('.')[0]
      this_.$emit('video-change-event', this_.selectVideoName)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleCommand: function (command) {
      this.selectVideoName = command
      this.$emit('video-change-event', this.selectVideoName)
      this.$message('switch to video 《' + this.selectVideoName + '》')
    }
  }
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  #drop_down {
    margin-bottom: 42.9px;
  }
</style>
